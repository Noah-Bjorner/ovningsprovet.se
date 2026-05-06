/* eslint-disable @next/next/no-img-element -- Markdown images can be arbitrary remote assets without known dimensions. */
import {
  Children,
  isValidElement,
  type CSSProperties,
  type ReactNode,
} from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

export type QuestionProps = {
  content: string;
  className?: string;
  eyebrow?: string;
  title?: string;
};

const imageWidthPattern = /\b(?:w|width)=([0-9]+(?:px|rem|em|%)?)/i;
const imageHeightPattern = /\b(?:h|height)=([0-9]+(?:px|rem|em|%)?)/i;
const imageSizePattern = /\bsize=(sm|md|lg|xl|full)\b/i;
const imageRatioPattern =
  /\b(?:r|ratio|aspect|aspect-ratio)=([0-9]+(?:\.[0-9]+)?(?::|\/)[0-9]+(?:\.[0-9]+)?|[0-9]+(?:\.[0-9]+)?)/i;

type MarkdownNode = {
  type?: string;
  tagName?: string;
  properties?: {
    title?: unknown;
  };
  children?: MarkdownNode[];
};

type ImageElementProps = {
  src?: unknown;
  node?: MarkdownNode;
};

type ImageMetadata = {
  displayTitle?: string;
  height?: string;
  ratio?: string;
  width?: string;
};

type QuestionImageStyle = CSSProperties & {
  "--question-image-width"?: string;
  "--question-image-height"?: string;
  "--question-image-row-height"?: string;
  "--question-image-ratio"?: string;
};

const imageSizeHeights = {
  sm: "160px",
  md: "200px",
  lg: "280px",
  xl: "360px",
  full: "min(520px, 70vh)",
} as const;

function countImageNodes(nodes?: MarkdownNode[]): number {
  return (
    nodes?.reduce((count, child) => {
      const childCount: number = countImageNodes(child.children);

      if (child.type === "element" && child.tagName === "img") {
        return count + 1 + childCount;
      }

      return count + childCount;
    }, 0) ?? 0
  );
}

function isRenderedImageElement(child: ReactNode) {
  if (!isValidElement<ImageElementProps>(child)) {
    return false;
  }

  return (
    child.type === "img" ||
    child.type === "figure" ||
    child.props.node?.tagName === "img" ||
    typeof child.props.src === "string"
  );
}

function normalizeSize(size?: string) {
  if (!size) {
    return undefined;
  }

  return /^\d+$/.test(size) ? `${size}px` : size;
}

function getString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function getImageHeight(title?: string) {
  const height = normalizeSize(title?.match(imageHeightPattern)?.[1]);
  const namedSize = title?.match(imageSizePattern)?.[1]?.toLowerCase() as
    | keyof typeof imageSizeHeights
    | undefined;

  return height ?? (namedSize ? imageSizeHeights[namedSize] : undefined);
}

function getImageGroupHeight(nodes?: MarkdownNode[]): string | undefined {
  for (const child of nodes ?? []) {
    const childHeight: string | undefined = getImageGroupHeight(child.children);

    if (childHeight) {
      return childHeight;
    }

    if (child.type === "element" && child.tagName === "img") {
      const title = getString(child.properties?.title);
      const height = getImageHeight(title);

      if (height) {
        return height;
      }
    }
  }

  return undefined;
}

function normalizeRatio(ratio?: string) {
  return ratio?.replace(":", " / ");
}

function getImageTitle(title?: string) {
  const cleanTitle = title
    ?.replace(imageWidthPattern, "")
    .replace(imageHeightPattern, "")
    .replace(imageSizePattern, "")
    .replace(imageRatioPattern, "")
    .trim();

  return cleanTitle || undefined;
}

function getImageMetadata(title: unknown): ImageMetadata {
  const rawTitle = getString(title);

  return {
    displayTitle: getImageTitle(rawTitle),
    height: getImageHeight(rawTitle),
    ratio: normalizeRatio(rawTitle?.match(imageRatioPattern)?.[1]),
    width: normalizeSize(rawTitle?.match(imageWidthPattern)?.[1]),
  };
}

const remarkPlugins = [remarkGfm, remarkMath];
const rehypePlugins = [rehypeKatex];

const markdownComponents = {
  p: ({ children, node }) => {
    const nodeChildren = node?.children as MarkdownNode[] | undefined;
    const imageCount =
      countImageNodes(nodeChildren) ||
      Children.toArray(children).filter(isRenderedImageElement).length;
    const imageGroupHeight = getImageGroupHeight(nodeChildren);
    const imageGroupStyle: QuestionImageStyle | undefined = imageGroupHeight
      ? {
          "--question-image-row-height": imageGroupHeight,
        }
      : undefined;

    if (imageCount > 0) {
      return (
        <div
          className={imageCount >= 2 ? "question-image-row" : "question-image-block"}
          style={imageGroupStyle}
        >
          {children}
        </div>
      );
    }

    return <p>{children}</p>;
  },
  img: ({ alt, src, title, style }) => {
    const imageMetadata = getImageMetadata(title);
    const imageSrc = getString(src);
    const imageStyle: QuestionImageStyle | undefined =
      imageMetadata.width || imageMetadata.height || imageMetadata.ratio
        ? { ...style }
        : style;

    if (!imageSrc) {
      return null;
    }

    if (imageMetadata.width && imageStyle) {
      imageStyle["--question-image-width"] = imageMetadata.width;
    }

    if (imageMetadata.height && imageStyle) {
      imageStyle["--question-image-height"] = imageMetadata.height;
    }

    if (imageMetadata.ratio && imageStyle) {
      imageStyle["--question-image-ratio"] = imageMetadata.ratio;
    }

    return (
      <figure className="question-image" style={imageStyle}>
        <span className="question-image-media">
          <img
            alt={getString(alt) ?? ""}
            src={imageSrc}
            title={imageMetadata.displayTitle}
          />
        </span>
        {imageMetadata.displayTitle && (
          <figcaption>{imageMetadata.displayTitle}</figcaption>
        )}
      </figure>
    );
  },
  table: ({ children }) => (
    <div className="my-5 w-full overflow-x-auto rounded-xl border border-border">
      <table>{children}</table>
    </div>
  ),
} satisfies Components;

export function Question({ className = "", content, eyebrow, title }: QuestionProps) {
  return (
    <article className={className || undefined}>
      {(eyebrow || title) && (
        <header className="mb-5 space-y-2">
          {eyebrow && (
            <p className="text-xxs uppercase tracking-widest text-text-tertiary">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-3xl leading-tight text-text">{title}</h2>
          )}
        </header>
      )}

      <div className="question-markdown">
        <ReactMarkdown
          rehypePlugins={rehypePlugins}
          remarkPlugins={remarkPlugins}
          components={markdownComponents}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
