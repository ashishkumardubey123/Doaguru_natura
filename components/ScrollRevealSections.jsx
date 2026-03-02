'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function setupScrollReveal() {
  const main = document.querySelector("main");
  const pageRoot = main?.firstElementChild;

  if (!(pageRoot instanceof HTMLElement)) return () => {};

  const blocks = Array.from(pageRoot.children).filter((node) => node instanceof HTMLElement);
  if (blocks.length <= 1) return () => {};

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hiddenBlocks = [];

  const makeVisible = (element) => {
    element.style.opacity = "1";
    element.style.pointerEvents = "";
  };

  const makeHidden = (element) => {
    element.style.opacity = "0";
    element.style.pointerEvents = "none";
    element.style.transition = "opacity 420ms ease";
    // Let the browser skip costly off-screen painting/layout work.
    element.style.contentVisibility = "auto";
    element.style.containIntrinsicSize = "1px 700px";
    hiddenBlocks.push(element);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          makeVisible(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.08,
    }
  );

  blocks.forEach((block, index) => {
    if (index === 0) {
      makeVisible(block);
      return;
    }

    const top = block.getBoundingClientRect().top;
    const inInitialViewport = top <= window.innerHeight * 0.9;

    if (prefersReducedMotion || inInitialViewport) {
      makeVisible(block);
      return;
    }

    makeHidden(block);
    observer.observe(block);
  });

  return () => {
    observer.disconnect();
    hiddenBlocks.forEach((block) => makeVisible(block));
  };
}

export default function ScrollRevealSections() {
  const pathname = usePathname();

  useEffect(() => {
    let cleanup = () => {};
    let raf2 = null;

    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        cleanup = setupScrollReveal();
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      if (raf2 !== null) cancelAnimationFrame(raf2);
      cleanup();
    };
  }, [pathname]);

  return null;
}
