"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

export interface FeatureSlide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface FeatureCardProps {
  slide: FeatureSlide;
}

function FeatureCard({ slide }: FeatureCardProps) {
  return (
    <div className="w-[85vw] shrink-0 snap-center md:w-full" data-feature-slide>
      <div className="flex h-[140px] items-stretch overflow-hidden rounded-3xl bg-[hsl(30_40%_95%)] border border-[hsl(30_40%_92%)] md:h-[110px]">
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 p-4 md:px-6">
          <h3 className="line-clamp-2 text-sm font-[450] leading-tight text-text">
            {slide.title}
          </h3>
          <p className="line-clamp-3 text-sm font-normal text-text-secondary md:max-w-sm">
            {slide.description}
          </p>
        </div>

        <div className="h-[140px] w-[140px] shrink-0">
          <Image
            alt={slide.title}
            className="h-full w-full object-cover"
            height={156}
            src={slide.imageUrl}
            unoptimized
            width={260}
          />
        </div>
      </div>
    </div>
  );
}

interface PageIndicatorProps {
  total: number;
  current: number;
  onSelect?: (index: number) => void;
}

function PageIndicator({ total, current, onSelect }: PageIndicatorProps) {
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <button
          aria-label={`Go to slide ${index + 1}`}
          className={`h-[5px] w-[5px] rounded-full transition-all duration-300 ${
            index === current
              ? "scale-110 bg-text-secondary"
              : "bg-border hover:bg-text-tertiary"
          }`}
          key={index}
          onClick={() => onSelect?.(index)}
          type="button"
        />
      ))}
    </div>
  );
}

interface FeatureCarouselProps {
  slides: FeatureSlide[];
  className?: string;
}

export default function FeatureCarousel({
  slides,
  className = "",
}: FeatureCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getSlideStep = useCallback(() => {
    const container = scrollContainerRef.current;

    if (!container) {
      return 0;
    }

    const firstSlide = container.querySelector<HTMLElement>("[data-feature-slide]");
    const styles = window.getComputedStyle(container);
    const gap = Number.parseFloat(styles.columnGap);

    return (firstSlide?.offsetWidth ?? container.offsetWidth) + (Number.isFinite(gap) ? gap : 0);
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) {
      return;
    }

    const container = scrollContainerRef.current;
    const slideStep = getSlideStep();

    if (slideStep === 0) {
      return;
    }

    const index = Math.round(container.scrollLeft / slideStep);

    setCurrentIndex(Math.min(Math.max(index, 0), slides.length - 1));
  }, [getSlideStep, slides.length]);

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollContainerRef.current) {
      return;
    }

    const container = scrollContainerRef.current;
    const slideStep = getSlideStep();

    if (slideStep === 0) {
      return;
    }

    container.scrollTo({
      behavior: "smooth",
      left: index * slideStep,
    });
  }, [getSlideStep]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      <div
        className="scrollbar-hide mx-auto flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 md:max-w-xl md:gap-0 md:scroll-px-0 md:px-0"
        onScroll={handleScroll}
        ref={scrollContainerRef}
      >
        {slides.map((slide) => (
          <FeatureCard key={slide.id} slide={slide} />
        ))}
        <div aria-hidden="true" className="w-[7.5vw] shrink-0 md:hidden" />
      </div>

      {slides.length > 1 && (
        <PageIndicator current={currentIndex} onSelect={scrollToIndex} total={slides.length} />
      )}
    </div>
  );
}
