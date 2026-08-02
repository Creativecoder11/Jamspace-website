import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  // Mobile browsers resize the viewport when the address bar hides/shows
  // while scrolling; without this, ScrollTrigger recalculates pinned
  // sections mid-scroll and the pin animation breaks.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, SplitText };
