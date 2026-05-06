import type { ComponentType } from "react";

import {
  ArrowIcon,
  ChevronIcon,
  ConfigureIcon,
} from "@/components/svgs/SolarIcons";
import {
  MathematicsIcon,
  type DoodleIconProps,
} from "@/components/svgs/SubjectIcons";

type SubjectSelection = {
  Icon: ComponentType<DoodleIconProps>;
  title: string;
};

interface InputContainerProps {
  selectedSubject?: SubjectSelection | null;
}

const placeholderSubject: SubjectSelection = {
  Icon: MathematicsIcon,
  title: "Matematik 2b",
};

export default function InputContainer({
  selectedSubject = null,
}: InputContainerProps) {
  const isSelected = Boolean(selectedSubject);
  const { Icon, title } = selectedSubject ?? placeholderSubject;

  return (
    <div className="relative flex w-full items-center gap-3 rounded-full border border-border bg-foreground p-3 pl-4 md:pl-5 transition-colors hover:border-border">
      <button
        aria-expanded={false}
        aria-haspopup="menu"
        aria-label={isSelected ? `Selected subject: ${title}` : "Select subject"}
        className={`group flex min-w-0 flex-1 items-center gap-2 text-left transition-colors ${
          isSelected
            ? "text-text"
            : "text-text-tertiary hover:text-text-secondary"
        }`}
        data-state={isSelected ? "selected" : "placeholder"}
        type="button"
      >
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center transition-colors ${
            isSelected ? "text-primary" : "text-text-tertiary group-hover:text-text-secondary"
          }`}
        >
          <Icon className="h-4 w-4" strokeWidth={isSelected ? 2.5 : 2.25} />
        </span>

        <span className="min-w-0 truncate text-base font-[450] leading-none">
          {title}
        </span>

        <ChevronIcon
          className={`h-4 w-4 shrink-0 transition-colors ${
            isSelected ? "text-text-secondary" : "text-text-tertiary group-hover:text-text-secondary"
          }`}
          strokeWidth={1.8}
        />
      </button>

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
        className="cursor-pointer flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-text transition-colors hover:bg-primary"
        type="button"
      >
        <ArrowIcon className="h-5 w-5 text-background transition-colors" strokeWidth={2} />
      </button>
    </div>
  );
}
