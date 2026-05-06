import type { SVGProps } from "react";

interface BlobIconProps extends SVGProps<SVGSVGElement> {
  cutoutColor?: string;
}

export default function BlobIcon({
  cutoutColor = "var(--background)",
  ...props
}: BlobIconProps) {
  return (
    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <path
          id="blob-icon-shape"
          d="M470 40.3335C450.333 18.0002 426.333 7.00015 395 6.66682C350 6.33348 334.333 21.0001 293.333 34.6668C281.333 38.6668 268 41.6668 250 41.6668C232 41.6668 218.667 39.3335 206.667 35.6668C166.667 22.3335 150.667 7.66682 116.667 6.66682C83.6667 5.66682 56.6667 14.0001 36.3333 34.6668C10.6667 60.3335 2.33333 90.3335 8.66666 126.667C14.3333 158 39 185.667 43.6667 217.333C46.3333 232.333 46.3333 249 43.3333 266C36.6667 303.667 12.3333 331.333 8.33333 368.667C5.33333 397 13.6667 427.667 32.6667 450.333C50 470 73.6667 489.333 110.333 493C141.333 494.333 165.333 483.333 190.667 473C214 463.667 225 456.667 252 456.667C278 456.667 291 462 313 471.333C338.667 482 359 492.667 389.667 493.333C419.667 493.667 442 483 458 468.667C478.667 450.333 492 428 494.333 393.667C497 351.667 476.333 325.333 464.667 292C456.333 269.333 455 243.667 460.333 217C467.333 188 484.667 165.667 490.333 139C498 103.667 489 63.0001 470 40.3335Z"
        />
      </defs>

      <use href="#blob-icon-shape" fill="currentColor" />
      <use
        href="#blob-icon-shape"
        fill={cutoutColor}
        transform="translate(250 250) scale(0.72) translate(-250 -250)"
      />
      <use
        href="#blob-icon-shape"
        fill="currentColor"
        transform="translate(250 250) scale(0.46) translate(-250 -250)"
      />
      <use
        href="#blob-icon-shape"
        fill={cutoutColor}
        transform="translate(250 250) scale(0.25) translate(-250 -250)"
      />
    </svg>
  );
}
