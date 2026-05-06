import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { MathfieldElement, MathfieldElementAttributes } from "mathlive";

type MathFieldElementProps = DetailedHTMLProps<
  HTMLAttributes<MathfieldElement> & Partial<MathfieldElementAttributes>,
  MathfieldElement
>;

declare module "react" {
  // MathLive exposes a custom element, so React needs this JSX tag definition.
  namespace JSX {
    interface IntrinsicElements {
      "math-field": MathFieldElementProps;
    }
  }
}

