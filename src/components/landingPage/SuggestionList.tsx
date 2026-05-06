import { ArrowIcon } from "@/components/svgs/SolarIcons";

const suggestionItems = [
  {
    id: "url",
    suggestion: "Paste an article, blog, or documentation URL",
  },
  {
    id: "file",
    suggestion: "Upload a PDF, Word doc, or study notes",
  },
  {
    id: "text",
    suggestion: "Paste copied text to turn into audio",
  },
  {
    id: "prompt",
    suggestion: "Prompt a podcast on any study topic",
  },
];

export default function SuggestionList() {
  return (
    <div className="mx-auto w-full max-w-xl">
      {suggestionItems.map((item, index) => (
        <button
          className={`group flex w-full items-center justify-between gap-4 border-b border-border px-3 py-3 text-left text-sm text-text-secondary transition-colors hover:text-text ${index >= 3 ? "hidden md:flex" : ""}`}
          key={item.id}
          type="button"
        >
          <span>{item.suggestion}</span>
          <ArrowIcon
            className="h-4 w-4 shrink-0 rotate-45 text-text-tertiary transition-colors group-hover:text-text-secondary"
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}
