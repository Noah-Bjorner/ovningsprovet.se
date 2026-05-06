"use client";

import { useEffect, useRef } from "react";

import styles from "./AmbientGridBackground.module.css";

type Shape = "circle" | "rhombus" | "square";

interface GridCell {
  shape: Shape;
}

interface AmbientGridBackgroundProps {
  className?: string;
}

const DEFAULT_DENSITY = 30;
const DEFAULT_COLOR = "hsl(26.67, 36%, 95.1%)";
const FRAME_INTERVAL = 1_000 / 30;
const MAX_DEVICE_PIXEL_RATIO = 1.5;
const WAVE_LOOP_DURATION = 10_000;

function waveEffect(x: number, y: number, time: number, centerX: number, centerY: number) {
  const normalizedX = x / (centerX * 2);
  const normalizedY = y / (centerY * 2);
  const primaryWave = Math.sin(normalizedX * 10 + time) * Math.cos(normalizedY * 5 + time);
  const diagonalWave = Math.sin((normalizedX + normalizedY) * 8 - time * 2) * Math.cos(normalizedY * 4 + time);
  const slowDrift = Math.sin(normalizedX * 4 - normalizedY * 6 + time * 3);

  return primaryWave * 0.74 + diagonalWave * 0.18 + slowDrift * 0.08;
}

function getCssVariable(computedStyle: CSSStyleDeclaration, property: string, fallback: string) {
  return computedStyle.getPropertyValue(property).trim() || fallback;
}

function getCssNumber(computedStyle: CSSStyleDeclaration, property: string, fallback: number) {
  const value = Number.parseFloat(getCssVariable(computedStyle, property, fallback.toString()));

  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function pickShape(column: number, row: number, seed: number): Shape {
  const rawValue = Math.sin(column * 12.9898 + row * 78.233 + seed * 37.719) * 43_758.5453;
  const value = rawValue - Math.floor(rawValue);

  if (value > 0.6) {
    return "circle";
  }

  if (value > 0.3) {
    return "rhombus";
  }

  return "square";
}

function getCanvasPixelRatio() {
  return Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
}

export default function AmbientGridBackground({ className = "" }: AmbientGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;

    if (!canvasElement) {
      return;
    }

    const canvas = canvasElement;
    const context = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });

    if (!context) {
      return;
    }

    const ctx = context;
    const parentElement = canvas.parentElement;

    if (!parentElement) {
      return;
    }

    const parent: HTMLElement = parentElement;
    const state = {
      cells: [] as GridCell[],
      columns: 0,
      rows: 0,
      size: 0,
      density: DEFAULT_DENSITY,
      color: DEFAULT_COLOR,
      seed: Math.random() * 10_000,
      time: 0,
      loopStartedAt: null as number | null,
      lastDrawAt: 0,
      frameId: null as number | null,
      resizeFrameId: null as number | null,
      isIntersecting: true,
      isPageVisible: !document.hidden,
      prefersReducedMotion: false,
    };
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    state.prefersReducedMotion = motionQuery.matches;

    function shouldAnimate() {
      return (
        !state.prefersReducedMotion &&
        state.isPageVisible &&
        state.isIntersecting &&
        state.cells.length > 0
      );
    }

    function resize() {
      const pixelRatio = getCanvasPixelRatio();
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      const computedStyle = window.getComputedStyle(parent);

      if (width === 0 || height === 0) {
        return;
      }

      const density = getCssNumber(computedStyle, "--ambient-grid-density", DEFAULT_DENSITY);
      const color = getCssVariable(computedStyle, "--ambient-grid-color", DEFAULT_COLOR);
      const canvasWidth = Math.round(width * pixelRatio);
      const canvasHeight = Math.round(height * pixelRatio);
      const hasSizeChanged = canvas.width !== canvasWidth || canvas.height !== canvasHeight;
      const hasDensityChanged = state.density !== density;
      const hasColorChanged = state.color !== color;
      const shouldBuildGrid = hasSizeChanged || hasDensityChanged || state.cells.length === 0;

      if (!shouldBuildGrid && !hasColorChanged) {
        return;
      }

      state.density = density;
      state.color = color;

      if (hasSizeChanged) {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
      }

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      if (shouldBuildGrid) {
        state.size = Math.min(width, height) / state.density;
        state.columns = Math.ceil(width / state.size) + 1;
        state.rows = Math.ceil(height / state.size) + 1;
        state.cells = Array.from({ length: state.columns * state.rows }, (_, index) => {
          const column = Math.floor(index / state.rows);
          const row = index % state.rows;

          return {
            shape: pickShape(column, row, state.seed),
          };
        });
      }

      if (state.prefersReducedMotion) {
        state.time = 0;
      }

      draw();
    }

    function draw() {
      const pixelRatio = getCanvasPixelRatio();
      const width = canvas.width / pixelRatio;
      const height = canvas.height / pixelRatio;
      const centerX = width / 2;
      const centerY = height / 2;
      const halfSize = state.size / 2;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = state.color;

      let cellIndex = 0;

      for (let column = 0; column < state.columns; column += 1) {
        for (let row = 0; row < state.rows; row += 1) {
          const cell = state.cells[cellIndex];
          cellIndex += 1;

          if (!cell) {
            continue;
          }

          const x = column * state.size;
          const y = row * state.size;
          const wave = (waveEffect(x, y, state.time, centerX, centerY) + 1) / 2;
          const normalized = wave < 0.2 ? 0 : wave > 0.8 ? 1 : (wave - 0.2) / 0.6;
          const smooth = normalized * normalized * (3 - 2 * normalized);
          const shapeSize = state.size * 0.1 + state.size * 0.7 * smooth;

          if (shapeSize < 0.5) {
            continue;
          }

          if (cell.shape === "square") {
            ctx.fillRect(
              x + (state.size - shapeSize) / 2,
              y + (state.size - shapeSize) / 2,
              shapeSize,
              shapeSize,
            );
            continue;
          }

          const centerShapeX = x + halfSize;
          const centerShapeY = y + halfSize;

          ctx.beginPath();

          if (cell.shape === "rhombus") {
            const radius = shapeSize * 0.4 * 1.414;

            ctx.moveTo(centerShapeX, centerShapeY - radius);
            ctx.lineTo(centerShapeX + radius, centerShapeY);
            ctx.lineTo(centerShapeX, centerShapeY + radius);
            ctx.lineTo(centerShapeX - radius, centerShapeY);
          } else {
            ctx.arc(centerShapeX, centerShapeY, shapeSize * 0.45, 0, Math.PI * 2);
          }

          ctx.fill();
        }
      }
    }

    function animate(timestamp: number) {
      if (!shouldAnimate()) {
        state.frameId = null;
        return;
      }

      state.loopStartedAt ??= timestamp;

      if (timestamp - state.lastDrawAt >= FRAME_INTERVAL) {
        state.time = (((timestamp - state.loopStartedAt) % WAVE_LOOP_DURATION) / WAVE_LOOP_DURATION) * Math.PI * 2;
        draw();
        state.lastDrawAt = timestamp;
      }

      state.frameId = window.requestAnimationFrame(animate);
    }

    function stopAnimation() {
      if (state.frameId === null) {
        return;
      }

      window.cancelAnimationFrame(state.frameId);
      state.frameId = null;
      state.lastDrawAt = 0;
    }

    function startAnimation() {
      if (state.frameId !== null || !shouldAnimate()) {
        return;
      }

      state.frameId = window.requestAnimationFrame(animate);
    }

    function updateAnimation() {
      if (shouldAnimate()) {
        startAnimation();
      } else {
        stopAnimation();
      }
    }

    function handleResize() {
      resize();
      updateAnimation();
    }

    function queueResize() {
      if (state.resizeFrameId !== null) {
        return;
      }

      state.resizeFrameId = window.requestAnimationFrame(() => {
        state.resizeFrameId = null;
        handleResize();
      });
    }

    function handleVisibilityChange() {
      state.isPageVisible = !document.hidden;
      updateAnimation();
    }

    function handleMotionPreferenceChange(event: MediaQueryListEvent) {
      state.prefersReducedMotion = event.matches;

      if (event.matches) {
        state.time = 0;
        draw();
      }

      updateAnimation();
    }

    handleResize();

    const intersectionObserver =
      "IntersectionObserver" in window
        ? new IntersectionObserver(([entry]) => {
            state.isIntersecting = entry?.isIntersecting ?? true;
            updateAnimation();
          })
        : null;
    const resizeObserver =
      "ResizeObserver" in window
        ? new ResizeObserver(() => {
            queueResize();
          })
        : null;

    intersectionObserver?.observe(parent);
    resizeObserver?.observe(parent);

    window.addEventListener("resize", queueResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionQuery.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", queueResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener("change", handleMotionPreferenceChange);
      if (state.resizeFrameId !== null) {
        window.cancelAnimationFrame(state.resizeFrameId);
      }
      stopAnimation();
    };
  }, []);

  return (
    <div aria-hidden="true" className={`${styles.wrapper} ${className}`}>
      <canvas className={styles.canvas} ref={canvasRef} />
      <svg className={styles.overlay} preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <filter
            filterUnits="userSpaceOnUse"
            height="160"
            id="ambient-grid-overlay-soften"
            width="160"
            x="-30"
            y="-30"
          >
            <feGaussianBlur stdDeviation="3.4" />
          </filter>
        </defs>
        <ellipse
          cx="50"
          cy="40"
          className={`${styles.overlayShape} ${styles.desktopOverlayShape}`}
          filter="url(#ambient-grid-overlay-soften)"
          rx="39"
          ry="61"
        />
        <ellipse
          cx="50"
          cy="47"
          className={`${styles.overlayShape} ${styles.mobileOverlayShape}`}
          filter="url(#ambient-grid-overlay-soften)"
          rx="55"
          ry="47"
        />
      </svg>
    </div>
  );
}
