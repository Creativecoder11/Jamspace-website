"use client";

import { useEffect, useState } from "react";

const FLAG = "Jam Space-preloaded";
const EVENT = "Jam Space:preloader-done";

/** True once the preloader has finished (or was already shown this session). */
export function usePreloaderDone() {
  const [ready, setReady] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem(FLAG) === "1",
  );

  useEffect(() => {
    if (ready) return;
    const onDone = () => setReady(true);
    window.addEventListener(EVENT, onDone);
    return () => window.removeEventListener(EVENT, onDone);
  }, [ready]);

  return ready;
}

export function markPreloaderDone() {
  sessionStorage.setItem(FLAG, "1");
  window.dispatchEvent(new Event(EVENT));
}

export function isPreloaderDone() {
  return typeof window !== "undefined" && sessionStorage.getItem(FLAG) === "1";
}
