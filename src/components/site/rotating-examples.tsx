"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function RotatingExamples({
  examples,
  className,
}: {
  examples: string[];
  className?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      const timeout = setTimeout(() => {
        setIndex((i) => (i + 1) % examples.length);
        setVisible(true);
      }, 250);
      return () => clearTimeout(timeout);
    }, 2200);
    return () => clearInterval(interval);
  }, [examples.length]);

  return (
    <span
      className={cn(
        "inline-block transition-all duration-200",
        visible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
        className
      )}
    >
      {examples[index]}
    </span>
  );
}
