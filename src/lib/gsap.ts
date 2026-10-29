"use client";

import { useEffect, useLayoutEffect, type MutableRefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };
export type GSAPCleanup = () => void;

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function useGSAP(
  callback: () => void | GSAPCleanup,
  options: { scope?: MutableRefObject<HTMLElement | null>; dependencies?: unknown[] } = {},
) {
  const { scope, dependencies = [] } = options;
  useIsomorphicLayoutEffect(() => {
    let cleanup: void | GSAPCleanup;
    const context = gsap.context(() => {
      cleanup = callback();
    }, scope?.current ?? undefined);
    return () => {
      cleanup?.();
      context.revert();
    };
    // The caller supplies the intended lifecycle dependencies, like @gsap/react's useGSAP.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

type ResizeListener = () => void;
const resizeSubscribers = new Set<ResizeListener>();
let resizeTimer: number | undefined;

function dispatchResize() {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => resizeSubscribers.forEach((listener) => listener()), 140);
}

/** Shared debounced window resize subscription: one native listener for all sections. */
export function observeWindowResize(listener: ResizeListener): () => void {
  resizeSubscribers.add(listener);
  if (resizeSubscribers.size === 1) window.addEventListener("resize", dispatchResize, { passive: true });
  return () => {
    resizeSubscribers.delete(listener);
    if (resizeSubscribers.size === 0) {
      window.removeEventListener("resize", dispatchResize);
      window.clearTimeout(resizeTimer);
      resizeTimer = undefined;
    }
  };
}

export function isWindowScroller(scroller: Element | Window): scroller is Window {
  return typeof window !== "undefined" && scroller === window;
}

export async function waitForScrollerReady(_scroller: Element | Window = window): Promise<void> {
  if (typeof document === "undefined") return;
  const documentReady = document.readyState === "complete"
    ? Promise.resolve()
    : new Promise<void>((resolve) => window.addEventListener("load", () => resolve(), { once: true }));
  await Promise.all([documentReady, document.fonts?.ready ?? Promise.resolve()]);
}
