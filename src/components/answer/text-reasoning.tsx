"use client";

type TextReasoningProps = {
  "aria-label"?: string;
  className?: string;
  placeholder?: string;
  rows?: number;
};

const defaultPlaceholder =
  "Explain your reasoning with words and calculations...";

export function TextReasoning({
  "aria-label": ariaLabel = "Text reasoning answer",
  className = "",
  placeholder = defaultPlaceholder,
  rows = 8,
}: TextReasoningProps) {
  return (
    <textarea
      aria-label={ariaLabel}
      className={`notebook-answer-field text-reasoning-field block min-h-52 w-full resize-none bg-background p-4 text-base leading-6 text-text outline-none transition ${className}`}
      placeholder={placeholder}
      rows={rows}
    />
  );
}
