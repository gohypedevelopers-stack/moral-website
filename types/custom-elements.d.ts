import * as React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "image-slot": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        id?: string;
        className?: string;
        src?: string;
        placeholder?: string;
        shape?: string;
        radius?: string | number;
        mask?: string;
        fit?: string;
        position?: string;
      }, HTMLElement>;
    }
  }
}
