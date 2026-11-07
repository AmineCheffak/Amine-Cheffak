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
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayedText(text);
      return;
    }

    let index = 0;
    setDisplayedText("");

    const timer = window.setInterval(() => {
      index++;
      setDisplayedText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(timer);
      }
    }, speed);

    return () => window.clearInterval(timer);
  }, [text, speed]);

  return <Linkify text={displayedText} />;
}