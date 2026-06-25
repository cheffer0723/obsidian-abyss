import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=-_";

function scramble(text: string) {
  return text
    .split("")
    .map((char) => (char === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]))
    .join("");
}

export function DecodeText({
  text,
  className,
  delay = 0,
  duration = 1000,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const [displayText, setDisplayText] = useState(() => scramble(text));
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!isInView) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(text);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < delay) {
        setDisplayText(scramble(text));
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min((elapsed - delay) / duration, 1);
      const charsToReveal = Math.floor(progress * text.length);

      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < charsToReveal) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [text, isInView, delay, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      aria-label={text}
      data-testid={`decode-text-${text.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <span aria-hidden="true">{displayText}</span>
    </motion.span>
  );
}
