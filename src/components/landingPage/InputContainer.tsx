import {
  ArrowIcon,
  ConfigureIcon,
} from "@/components/svgs/SolarIcons";

export default function InputContainer() {
  return (
    <div className="relative flex w-full items-center gap-3 rounded-full border border-border bg-foreground p-3 pl-5  transition-colors hover:border-border">
      <input
        aria-label="Listen to anything"
        className="min-w-0 flex-1 bg-transparent px-1.5 py-1.5 text-base leading-none text-text outline-none placeholder:text-text-tertiary md:px-1"
        placeholder="Listen to anything"
        type="text"
      />

      <button
        aria-label="Configure"
        className="flex shrink-0 items-center gap-1.5 pl-0.5 text-xs font-[450] text-text transition-opacity hover:opacity-80"
        type="button"
      >
        <ConfigureIcon className="h-[14px] w-[14px] shrink-0 text-text" strokeWidth={1.75} />
        <span>Configure</span>
      </button>

      <button
        aria-label="Submit"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-text transition-opacity hover:opacity-80"
        type="button"
      >
        <ArrowIcon className="h-5 w-5 text-background" strokeWidth={2} />
      </button>
    </div>
  );
}
