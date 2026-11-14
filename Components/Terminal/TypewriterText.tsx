"use client";

import { useEffect, useState } from "react";

import Linkify from "./Linkify";

export default function TypewriterText({
  text,
  speed = 18,
}: {
  text: string;
  speed?: number;
}) {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [displayedText, setDisplayedText] = useState(
    prefersReducedMotion ? text : ""
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      const id = window.setTimeout(() => setDisplayedText(text), 0);
      return () => window.clearTimeout(id);
    }

    let index = 0;
    let timer: number | undefined;
    const resetId = window.setTimeout(() => {
      setDisplayedText("");

      timer = window.setInterval(() => {
        index++;
        setDisplayedText(text.slice(0, index));

        if (index >= text.length) {
          window.clearInterval(timer);
        }
      }, speed);
    }, 0);

    return () => {
      window.clearTimeout(resetId);

      if (timer) {
        window.clearInterval(timer);
      }
    };
  }, [prefersReducedMotion, speed, text]);

  return <Linkify text={displayedText} />;
}