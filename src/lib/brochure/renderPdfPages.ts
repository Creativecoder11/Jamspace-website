/**
 * Renders the pages of a PDF to image URLs in the browser, for the flip book.
 * pdf.js is imported on demand, so it only downloads when the brochure is opened.
 *
 * The book opens as soon as its first few pages are ready; the rest render in the
 * background, in order, and are announced through `onPage`. Only the byte ranges
 * a page needs are fetched, so the first pages don't wait for the whole file.
 * A page that fails to load is retried, then marked as failed without stopping the
 * pages after it; once pages keep failing (the connection is likely gone) the rest get
 * one attempt each, so they fail fast instead of waiting out every retry.
 * Books are cached per URL, so reopening the brochure picks up where it left off;
 * a book with failed pages is rebuilt on the next open.
 */

/** A page's image URL; null while it renders, false if it couldn't be rendered. */
export type PdfPage = string | false | null;

export interface PdfBook {
  /** Page width ÷ height, taken from the first page. */
  ratio: number;
  total: number;
  /** One entry per page, in order. */
  pages: PdfPage[];
  /** Calls `fn` each time a page finishes — or fails. Returns an unsubscribe. */
  onPage(fn: (index: number, page: string | false) => void): () => void;
}

type Progress = (done: number, needed: number) => void;
type PdfJs = typeof import("pdfjs-dist/legacy/build/pdf.mjs");
type PdfTask = ReturnType<PdfJs["getDocument"]>;
type PdfDocument = Awaited<PdfTask["promise"]>;

/** Widest a page is ever shown (CSS px); pages render at this × devicePixelRatio. */
const MAX_DISPLAY_WIDTH = 1280;
const MAX_PIXEL_WIDTH = 2048;
/** The cover and the first spread — enough to open the book and turn the first page. */
const READY_AFTER = 3;
/** Extra attempts for a page (or the document) whose data failed to download. */
const RETRIES = 2;
/** No data for this long means the download has stalled — it is retried. */
const STALL_MS = 30_000;
/** Small enough that pdf.js reports progress often, even on a slow connection. */
const CHUNK_SIZE = 512 * 1024;
/** After this many failed pages in a row, later pages get one attempt each instead of retries. */
const FAST_FAIL_AFTER = 2;

interface Entry {
  book: Promise<PdfBook>;
  progress: Set<Progress>;
  /** The last progress reported, so a reopened modal starts from it. */
  last: [done: number, needed: number] | null;
  ready: boolean;
  /** Filled once the pages array exists, so its object URLs can be freed when the book is dropped. */
  pages: PdfPage[];
}

const cache = new Map<string, Entry>();

let workerReady = false;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Frees a dropped book's images. */
function release(entry: Entry) {
  entry.pages.forEach((src) => {
    if (src) URL.revokeObjectURL(src);
  });
}

/** Drops a book from the cache, unless a newer one has already replaced it. */
function drop(url: string, entry: Entry) {
  if (cache.get(url) === entry) cache.delete(url);
}

/** Resolves once the first pages are rendered; `onProgress` reports progress towards that. */
export function openPdfBook(url: string, onProgress?: Progress): Promise<PdfBook> {
  let entry = cache.get(url);
  if (!entry) {
    const stale = staleBooks.get(url);
    if (stale) {
      // The modal that showed it is closed by now.
      release(stale);
      staleBooks.delete(url);
    }
    const created = { progress: new Set(), last: null, ready: false, pages: [] } as Omit<Entry, "book"> as Entry;
    created.book = load(url, created);
    created.book.catch(() => drop(url, created));
    cache.set(url, created);
    entry = created;
  }
  if (onProgress && !entry.ready) {
    entry.progress.add(onProgress);
    if (entry.last) onProgress(...entry.last);
  }
  return entry.book;
}

/** Books dropped after a failure, whose images are freed on the next open. */
const staleBooks = new Map<string, Entry>();

async function load(url: string, entry: Entry): Promise<PdfBook> {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  if (!workerReady) {
    pdfjs.GlobalWorkerOptions.workerPort = new Worker(
      new URL("pdfjs-dist/legacy/build/pdf.worker.min.mjs", import.meta.url),
      { type: "module" },
    );
    workerReady = true;
  }

  // pdf.js never re-requests a byte range that failed once, so a retry needs a fresh document.
  let task: PdfTask | null = null;
  /** When pdf.js last received data. A slow download is fine; a stalled one is retried. */
  let lastActivity = Date.now();
  const untilStalled = <T>(promise: Promise<T>, what: string) =>
    new Promise<T>((resolve, reject) => {
      lastActivity = Date.now();
      const timer = setInterval(() => {
        if (Date.now() - lastActivity < STALL_MS) return;
        clearInterval(timer);
        reject(new Error(`${what} stalled — no data for ${STALL_MS / 1000}s`));
      }, 1000);
      promise.then(
        (value) => {
          clearInterval(timer);
          resolve(value);
        },
        (err) => {
          clearInterval(timer);
          reject(err);
        },
      );
    });
  const closeDocument = async () => {
    const current = task;
    task = null;
    await current?.destroy().catch(() => {});
  };
  const openDocument = async (): Promise<PdfDocument> => {
    await closeDocument();
    task = pdfjs.getDocument({ url, disableAutoFetch: true, disableStream: true, rangeChunkSize: CHUNK_SIZE });
    task.onProgress = () => {
      lastActivity = Date.now();
    };
    try {
      return await untilStalled(task.promise, "Opening the brochure");
    } catch (err) {
      await closeDocument();
      throw err;
    }
  };

  /** Runs `attempt`, reopening the document and retrying when its data fails to load. */
  const retry = async <T>(
    what: string,
    attempt: (doc: PdfDocument) => Promise<T>,
    retries = RETRIES,
  ): Promise<T> => {
    for (let n = 0; ; n++) {
      try {
        const doc = task ? await task.promise : await openDocument();
        return await untilStalled(attempt(doc), what);
      } catch (err) {
        console.warn(`[Brochure] ${what} failed (attempt ${n + 1}):`, err);
        await closeDocument();
        if (n >= retries) throw err;
        await wait(1000 * (n + 1));
      }
    }
  };

  const report = (done: number, needed: number) => {
    entry.last = [done, needed];
    entry.progress.forEach((fn) => fn(done, needed));
  };

  let total: number;
  let ratio: number;
  try {
    [total, ratio] = await retry("Opening the brochure", async (doc) => {
      const first = (await doc.getPage(1)).getViewport({ scale: 1 });
      return [doc.numPages, first.width / first.height] as const;
    });
  } catch (err) {
    await closeDocument();
    throw err;
  }

  const needed = Math.min(READY_AFTER, total);
  report(0, needed);

  const targetWidth = Math.min(MAX_PIXEL_WIDTH, MAX_DISPLAY_WIDTH * Math.min(window.devicePixelRatio || 1, 2));

  const renderPage = async (doc: PdfDocument, n: number): Promise<string> => {
    const page = await doc.getPage(n);
    const base = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale: targetWidth / base.width });
    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);

    await page.render({ canvas, viewport }).promise;
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.88));
    page.cleanup();
    // Free the canvas memory now rather than at garbage collection (matters on iOS).
    canvas.width = canvas.height = 0;
    if (!blob) throw new Error(`Could not render page ${n}`);
    return URL.createObjectURL(blob);
  };

  const pages: PdfPage[] = new Array(total).fill(null);
  entry.pages = pages;
  const listeners = new Set<(index: number, page: string | false) => void>();
  const settle = (i: number, page: string | false) => {
    pages[i] = page;
    listeners.forEach((fn) => fn(i, page));
  };

  let markReady!: () => void;
  let failReady!: (err: unknown) => void;
  const ready = new Promise<void>((resolve, reject) => {
    markReady = resolve;
    failReady = reject;
  });

  void (async () => {
    let failure: unknown = null;
    let anyFailed = false;
    let failedInARow = 0;
    try {
      for (let i = 0; i < total; i++) {
        const retries = failedInARow >= FAST_FAIL_AFTER ? 0 : RETRIES;
        const page = await retry(`Page ${i + 1}`, (doc) => renderPage(doc, i + 1), retries).catch(
          () => false as const,
        );
        failedInARow = page === false ? failedInARow + 1 : 0;
        if (page === false) anyFailed = true;
        settle(i, page);

        // Without a cover there is nothing worth opening.
        if (i === 0 && page === false) throw new Error("Could not render the first page");
        if (i < needed) report(i + 1, needed);
        if (i + 1 === needed) {
          entry.ready = true;
          entry.progress.clear();
          markReady();
        }
      }
    } catch (err) {
      failure = err;
      anyFailed = true;
    } finally {
      // Let pdf.js finish tearing down before anything can open the brochure again.
      await closeDocument();
      if (anyFailed && cache.get(url) === entry) {
        // Rebuild on the next open; this book's images are freed then.
        cache.delete(url);
        staleBooks.set(url, entry);
      }
      if (failure) failReady(failure);
    }
  })();

  await ready;

  return {
    ratio,
    total,
    pages,
    onPage(fn) {
      listeners.add(fn);
      return () => {
        listeners.delete(fn);
      };
    },
  };
}
