"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { ChevronLeft, ChevronRight, Download, Maximize2, Minimize2, X } from "lucide-react";
import type { PageFlip } from "page-flip";
import { gsap } from "@/lib/animations/gsap";
import { brochure } from "@/lib/data/brochure";
import { openPdfBook, type PdfBook, type PdfPage } from "@/lib/brochure/renderPdfPages";
import { trackBrochureDownload } from "@/lib/analytics";

type Status = "loading" | "ready" | "error";

/** Below this stage width the book shows one page at a time. */
const PORTRAIT_BELOW = 768;

const PLACEHOLDER_CLASS = "flex h-full w-full items-center justify-center p-4 text-center text-sm text-muted";

/** Shows a rendered page, or a placeholder until its image arrives (or if it never can). */
function fillPage(page: HTMLElement, src: PdfPage, index: number, total: number) {
  if (src) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Brochure page ${index + 1} of ${total}`;
    img.draggable = false;
    img.className = "pointer-events-none h-full w-full select-none object-cover";
    page.replaceChildren(img);
    return;
  }
  const placeholder = document.createElement("div");
  placeholder.className = PLACEHOLDER_CLASS;
  const message = src === false ? "This page couldn’t be loaded." : "Loading page…";
  placeholder.textContent = message;
  // Say which page this stands in for, as a rendered page's alt text does.
  placeholder.setAttribute("role", "img");
  placeholder.setAttribute("aria-label", `Brochure page ${index + 1} of ${total}: ${message}`);
  page.replaceChildren(placeholder);
}

/**
 * Full-screen brochure reader: the PDF rendered as a flip book with page curl.
 * Drag a page corner, click a page, use the arrows or ← → to turn pages.
 */
export function BrochureModal({ onClose }: { onClose: () => void }) {
  const lenis = useLenis();
  const titleId = `${useId()}-title`;

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<PageFlip | null>(null);
  /** The book's page elements, so pages rendered later can be filled in place. */
  const pageElsRef = useRef<HTMLElement[]>([]);
  const layoutRef = useRef({ pageW: 0, pageH: 0, portrait: false });

  const [status, setStatus] = useState<Status>("loading");
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [pdf, setPdf] = useState<PdfBook | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const [layout, setLayout] = useState({ pageW: 0, pageH: 0, portrait: false });
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Client-only component (loaded with ssr: false), so document is available.
  const [canFullscreen] = useState(() => Boolean(document.fullscreenEnabled));

  const pageCount = pdf?.total ?? 0;

  // Render the first pages, then open the book; the rest keep rendering behind it.
  useEffect(() => {
    let cancelled = false;
    openPdfBook(brochure.href, (done, total) => {
      if (!cancelled) setProgress({ done, total });
    })
      .then((result) => {
        if (cancelled) return;
        setPdf(result);
        setStatus("ready");
      })
      .catch((err) => {
        console.error("[Brochure] Could not load the brochure:", err);
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Fill pages in as they finish rendering.
  useEffect(() => {
    if (!pdf) return;
    return pdf.onPage((i, src) => {
      const page = pageElsRef.current[i];
      if (page) fillPage(page, src, i, pdf.total);
    });
  }, [pdf]);

  // Lock page scroll, animate in, focus Close, restore focus on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    lenis?.stop();
    document.body.style.overflow = "hidden";

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", delay: 0.05 },
      );
    }
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

    return () => {
      window.clearTimeout(focusTimer);
      if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
      lenis?.start();
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [lenis]);

  // Size the book to the stage: the largest two-page spread that fits, or one page at a
  // time on narrow screens.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !pdf) return;

    const measure = () => {
      const { clientWidth: w, clientHeight: h } = stage;
      if (!w || !h) return;
      const portrait = w < PORTRAIT_BELOW;
      const cols = portrait ? 1 : 2;
      let pageH = h;
      let pageW = pageH * pdf.ratio;
      if (pageW * cols > w) {
        pageW = w / cols;
        pageH = pageW / pdf.ratio;
      }
      const next = { pageW: Math.floor(pageW), pageH: Math.floor(pageH), portrait };
      const prev = layoutRef.current;
      if (prev.pageW === next.pageW && prev.pageH === next.pageH && prev.portrait === next.portrait) return;
      layoutRef.current = next;
      setLayout(next);
    };

    let timer: number | undefined;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(measure, 120);
    });
    measure();
    observer.observe(stage);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [pdf]);

  // Build (or rebuild after a resize) the flip book, keeping the current page.
  useEffect(() => {
    const host = hostRef.current;
    if (!host || !pdf || !layout.pageW) return;
    let cancelled = false;

    const startPage = flipRef.current?.getCurrentPageIndex() ?? 0;
    flipRef.current?.destroy();
    flipRef.current = null;
    host.replaceChildren();

    const book = document.createElement("div");
    const pages = pdf.pages.map((src, i) => {
      const page = document.createElement("div");
      page.className = "bg-white";
      if (i === 0 || i === pdf.total - 1) page.dataset.density = "hard";
      fillPage(page, src, i, pdf.total);
      book.appendChild(page);
      return page;
    });
    pageElsRef.current = pages;
    host.appendChild(book);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    void import("page-flip").then(({ PageFlip }) => {
      if (cancelled) return;
      const flip = new PageFlip(book, {
        width: layout.pageW,
        height: layout.pageH,
        size: "fixed",
        startPage,
        showCover: true,
        usePortrait: layout.portrait,
        autoSize: false,
        maxShadowOpacity: 0.35,
        flippingTime: reduced ? 1 : 900,
        mobileScrollSupport: false,
      });
      flip.loadFromHTML(pages);
      flip.on("flip", (e) => setPageIndex(e.data));
      flip.on("changeState", (e) => setIsTurning(e.data === "flipping"));
      flipRef.current = flip;
      setPageIndex(flip.getCurrentPageIndex());
    });

    return () => {
      cancelled = true;
    };
  }, [pdf, layout]);

  // Tear the book down when the modal closes.
  useEffect(
    () => () => {
      flipRef.current?.destroy();
      flipRef.current = null;
    },
    [],
  );

  const flipPrev = useCallback(() => flipRef.current?.flipPrev(), []);
  const flipNext = useCallback(() => flipRef.current?.flipNext(), []);

  // Escape closes, ← → turn pages, Tab stays inside the dialog.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (!document.fullscreenElement) onClose();
        return;
      }
      if (e.key === "ArrowLeft") return flipPrev();
      if (e.key === "ArrowRight") return flipNext();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, flipPrev, flipNext]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    else void panelRef.current?.requestFullscreen().catch(() => {});
  };

  const { portrait, pageW, pageH } = layout;
  const lastIndex = pageCount - 1;
  const atStart = pageIndex <= 0;
  const atEnd = portrait ? pageIndex >= lastIndex : pageIndex >= lastIndex - 1;

  // A closed book shows one page on the right half of a spread — slide it to the centre.
  // The slide starts with the page turn, so the book opens towards the middle.
  let shift = 0;
  if (!portrait && pageCount > 1 && !isTurning) {
    if (pageIndex === 0) shift = -pageW / 2;
    else if (pageCount % 2 === 0 && pageIndex === lastIndex) shift = pageW / 2;
  }

  let pageLabel = "";
  if (pageCount) {
    const showsSpread = !portrait && pageIndex > 0 && pageIndex < lastIndex;
    pageLabel = showsSpread
      ? `${pageIndex + 1}–${pageIndex + 2} / ${pageCount}`
      : `${pageIndex + 1} / ${pageCount}`;
  }

  const navButton =
    "flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-white disabled:pointer-events-none disabled:opacity-30";
  const toolButton =
    "flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:text-accent";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-100 flex items-center justify-center bg-[#efebe4] backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-lenis-prevent
        className="relative flex h-full w-full flex-col bg-[#efebe4]"
      >
        {/* Toolbar */}
        <div className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border px-4 md:h-18 md:px-6">
          <div className="flex items-baseline gap-4">
            <h2 id={titleId} className="text-xl font-normal md:text-2xl">
              {brochure.title}
            </h2>
            {status === "ready" && (
              <span className="hidden text-sm tabular-nums text-muted md:inline" aria-live="polite">
                {pageLabel}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <a
              href={brochure.href}
              download={brochure.downloadName}
              onClick={() => trackBrochureDownload("brochure_modal")}
              aria-label="Download brochure (PDF)"
              title="Download PDF"
              className={toolButton}
            >
              <Download className="h-5 w-5" strokeWidth={1.75} />
            </a>
            {canFullscreen && (
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit full screen" : "Full screen"}
                title={isFullscreen ? "Exit full screen" : "Full screen"}
                className={`hidden md:flex ${toolButton}`}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-5 w-5" strokeWidth={1.75} />
                ) : (
                  <Maximize2 className="h-5 w-5" strokeWidth={1.75} />
                )}
              </button>
            )}
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close brochure"
              className="ml-1 flex h-10 w-10 items-center justify-center text-accent transition-colors hover:text-foreground"
            >
              <X className="h-7 w-7" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Stage */}
        <div className="relative min-h-0 flex-1 overflow-hidden px-4 py-6 md:px-20 md:py-6">
          <div ref={stageRef} className="flex h-full w-full items-center justify-center">
            {status === "ready" && (
              <div
                className="transition-transform duration-700 ease-out motion-reduce:transition-none"
                style={{ transform: `translateX(${shift}px)` }}
              >
                <div ref={hostRef} style={{ width: portrait ? pageW : pageW * 2, height: pageH }} />
              </div>
            )}

            {status === "loading" && (
              <div className="flex w-full max-w-60 flex-col items-center gap-3 text-center" role="status">
                <p className="text-sm text-muted">Preparing brochure…</p>
                <div className="h-0.5 w-full overflow-hidden bg-border">
                  <div
                    className="h-full bg-accent transition-[width] duration-300"
                    style={{ width: `${Math.max(8, progress.total ? (progress.done / progress.total) * 100 : 0)}%` }}
                  />
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="max-w-sm text-center" role="alert">
                <p className="text-xl">The brochure isn&apos;t available right now.</p>
                <p className="mt-2 text-sm text-muted">Please try again later.</p>
              </div>
            )}
          </div>

          {status === "ready" && (
            <>
              <button
                type="button"
                onClick={flipPrev}
                disabled={atStart}
                aria-label="Previous page"
                className={`absolute left-4 top-1/2 hidden -translate-y-1/2 md:flex ${navButton}`}
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={flipNext}
                disabled={atEnd}
                aria-label="Next page"
                className={`absolute right-4 top-1/2 hidden -translate-y-1/2 md:flex ${navButton}`}
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </>
          )}
        </div>

        {/* Mobile page controls */}
        {status === "ready" && (
          <div className="flex shrink-0 items-center justify-between border-t border-border px-4 py-3 md:hidden">
            <button type="button" onClick={flipPrev} disabled={atStart} aria-label="Previous page" className={navButton}>
              <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <span className="text-sm tabular-nums text-muted" aria-live="polite">
              {pageLabel}
            </span>
            <button type="button" onClick={flipNext} disabled={atEnd} aria-label="Next page" className={navButton}>
              <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
