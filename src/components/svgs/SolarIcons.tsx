export type IconProps = {
  className?: string;
  strokeWidth?: number;
};

export function ConfigureIcon({ className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 14C11.1569 14 12.5 15.3431 12.5 17C12.5 18.6568 11.1569 20 9.5 20C7.84315 20 6.5 18.6568 6.5 17C6.5 15.3431 7.84315 14 9.5 14Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M14.5 3.99998C12.8431 3.99998 11.5 5.34312 11.5 6.99998C11.5 8.65683 12.8431 9.99998 14.5 9.99998C16.1569 9.99998 17.5 8.65683 17.5 6.99998C17.5 5.34312 16.1569 3.99998 14.5 3.99998Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M15 16.9585L22 16.9585"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M9 6.9585L2 6.9585"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M2 16.9585L4 16.9585"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 6.9585L20 6.9585"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

export function LinkIcon({ className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0464 14C8.54044 12.4882 8.67609 9.90087 10.3494 8.22108L15.197 3.35462C16.8703 1.67483 19.4476 1.53865 20.9536 3.05046C22.4596 4.56228 22.3239 7.14956 20.6506 8.82935L18.2268 11.2626"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M13.9536 10C15.4596 11.5118 15.3239 14.0991 13.6506 15.7789L8.80299 20.6454C7.12969 22.3252 4.55237 22.4613 3.0464 20.9495C1.54043 19.4377 1.67609 16.8504 3.34939 15.1706L5.77323 12.7373"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

export function UploadIcon({ className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M12 16V3M12 3L16 7.375M12 3L8 7.375"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

export function DocumentTextIcon({ className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
        strokeWidth={strokeWidth}
      />
      <path d="M8 12H16" strokeLinecap="round" strokeWidth={strokeWidth} />
      <path d="M8 8H16" strokeLinecap="round" strokeWidth={strokeWidth} />
      <path d="M8 16H13" strokeLinecap="round" strokeWidth={strokeWidth} />
    </svg>
  );
}

export function MicrophoneIcon({ className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V13C18 16.3137 15.3137 19 12 19C8.68629 19 6 16.3137 6 13V8Z"
        strokeWidth={strokeWidth}
      />
      <path
        d="M10 6.5C10 6.5 10.4727 6 12 6C13.5273 6 14 6.5 14 6.5"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M10 9.5C10 9.5 10.4727 9 12 9C13.5273 9 14 9.5 14 9.5"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M21 11V13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13V11"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

export function ChevronIcon({ className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      style={{ transform: "rotate(180deg)" }}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 15L12 9L5 15"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

export function ArrowIcon({ className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 20L12 4M12 4L18 10M12 4L6 10"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
