// page-flip ships no type definitions — this covers the parts the brochure uses.
declare module "page-flip" {
  export interface PageFlipSettings {
    width: number;
    height: number;
    size?: "fixed" | "stretch";
    startPage?: number;
    showCover?: boolean;
    usePortrait?: boolean;
    autoSize?: boolean;
    drawShadow?: boolean;
    maxShadowOpacity?: number;
    flippingTime?: number;
    mobileScrollSupport?: boolean;
    showPageCorners?: boolean;
    swipeDistance?: number;
  }

  export interface PageFlipEvent<T = unknown> {
    data: T;
  }

  export class PageFlip {
    constructor(element: HTMLElement, settings: PageFlipSettings);
    loadFromHTML(items: NodeListOf<HTMLElement> | HTMLElement[]): void;
    flipNext(corner?: "top" | "bottom"): void;
    flipPrev(corner?: "top" | "bottom"): void;
    turnToPage(index: number): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
    on(event: "flip", callback: (e: PageFlipEvent<number>) => void): this;
    on(event: "changeState", callback: (e: PageFlipEvent<"user_fold" | "fold_corner" | "flipping" | "read">) => void): this;
    on(event: "changeOrientation", callback: (e: PageFlipEvent<"portrait" | "landscape">) => void): this;
    destroy(): void;
  }
}

// The legacy build of pdf.js has the same API as the main entry, which carries the types.
declare module "pdfjs-dist/legacy/build/pdf.mjs" {
  export * from "pdfjs-dist";
}
