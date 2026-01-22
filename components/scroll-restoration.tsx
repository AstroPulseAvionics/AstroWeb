"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestoration() {
  const pathname = usePathname();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (previousPath.current === "/" && pathname === "/part-by-part") {
      const root = document.documentElement;
      const hadSmooth = root.classList.contains("!scroll-smooth");
      const previousBehavior = root.style.scrollBehavior;
      if (hadSmooth) {
        root.classList.remove("!scroll-smooth");
      }
      root.style.scrollBehavior = "auto";
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      if (hadSmooth) {
        requestAnimationFrame(() => {
          root.classList.add("!scroll-smooth");
          root.style.scrollBehavior = previousBehavior;
        });
      } else {
        root.style.scrollBehavior = previousBehavior;
      }
    }
    previousPath.current = pathname;
  }, [pathname]);

  return null;
}
