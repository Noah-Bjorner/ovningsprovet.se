"use client";

import "mathlive";
import type { MathfieldElement } from "mathlive";
import { useSyncExternalStore } from "react";

const answerPlaceholder = String.raw`a) write your answer here...`;
const fieldClassName =
  "math-reasoning-field block min-h-14 w-full rounded-none border-b border-border bg-transparent px-0 py-2 text-base leading-6 text-text outline-none transition focus-within:border-text-secondary";

function subscribeToHydration() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function configureMathfield(mathfield: MathfieldElement | null) {
  if (!mathfield) {
    return;
  }

  (mathfield.constructor as typeof MathfieldElement).decimalSeparator = ",";
  mathfield.menuItems = [];
  mathfield.defaultMode = "text";
  mathfield.mathVirtualKeyboardPolicy = "manual";
  mathfield.smartMode = true;
  mathfield.smartFence = true;
}

export function MathReasoning() {
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot,
  );

  if (!isHydrated) {
    return <div aria-hidden="true" className={fieldClassName} />;
  }

  return (
    <div>
      <math-field
        aria-label="Math reasoning answer"
        className={fieldClassName}
        default-mode="text"
        math-virtual-keyboard-policy="manual"
        placeholder={answerPlaceholder}
        ref={configureMathfield}
        smart-mode="on"
      />
    </div>
  );
}

export { MathReasoning as MathReasoningTest };
