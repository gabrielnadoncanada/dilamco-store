"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export function useTweaks<T extends object>(defaults: T) {
  const [values, setValues] = useState<T>(defaults);
  const setTweak = useCallback(
    <K extends keyof T>(keyOrEdits: K | Partial<T>, val?: T[K]) => {
      const edits =
        typeof keyOrEdits === "object" && keyOrEdits !== null
          ? (keyOrEdits as Partial<T>)
          : ({ [keyOrEdits as K]: val } as Partial<T>);
      setValues((prev) => ({ ...prev, ...edits }));
      try {
        window.parent?.postMessage({ type: "__edit_mode_set_keys", edits }, "*");
      } catch {}
    },
    [],
  );
  return [values, setTweak] as const;
}

interface PanelProps {
  title?: string;
  children: ReactNode;
}

export function TweaksPanel({ title = "Tweaks", children }: PanelProps) {
  const [open, setOpen] = useState(false);
  const dragRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clampToViewport = useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth;
    const h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.right = offsetRef.current.x + "px";
    panel.style.bottom = offsetRef.current.y + "px";
  }, []);

  useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", clampToViewport);
      return () => window.removeEventListener("resize", clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const t = e?.data?.type;
      if (t === "__activate_edit_mode") setOpen(true);
      else if (t === "__deactivate_edit_mode") setOpen(false);
    };
    window.addEventListener("message", onMsg);
    try {
      window.parent?.postMessage({ type: "__edit_mode_available" }, "*");
    } catch {}
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      window.parent?.postMessage({ type: "__edit_mode_dismissed" }, "*");
    } catch {}
  };

  const onDragStart = (e: React.MouseEvent) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX;
    const sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev: MouseEvent) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  if (!open) return null;
  return (
    <div
      ref={dragRef}
      className="fixed z-[2147483646] flex max-h-[calc(100vh-32px)] w-[280px] flex-col overflow-hidden rounded-[14px] border border-white/60 bg-[#faf9f7c7] font-sans text-[11.5px] leading-[1.4] text-[#29261b] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl"
      data-noncommentable=""
      style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}
    >
      <div
        className="flex cursor-move select-none items-center justify-between py-2.5 pl-3.5 pr-2"
        onMouseDown={onDragStart}
      >
        <b className="text-xs font-semibold tracking-[0.01em]">{title}</b>
        <button
          className="size-[22px] cursor-default rounded-md border-0 bg-transparent text-[13px] leading-none text-[#29261b]/55 hover:bg-black/5 hover:text-[#29261b]"
          aria-label="Close tweaks"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={dismiss}
        >
          ✕
        </button>
      </div>
      <div className="flex min-h-0 flex-col gap-2.5 overflow-y-auto overflow-x-hidden px-3.5 pb-3.5 pt-0.5 [scrollbar-width:thin]">
        {children}
      </div>
    </div>
  );
}

export function TweakSection({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <>
      <div className="pt-2.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#29261b]/45 first:pt-0">
        {label}
      </div>
      {children}
    </>
  );
}

interface TweakRowProps {
  label: string;
  value?: ReactNode;
  children: ReactNode;
  inline?: boolean;
}

export function TweakRow({ label, value, children, inline = false }: TweakRowProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[5px]",
        inline && "flex-row items-center justify-between gap-2.5",
      )}
    >
      <div className="flex items-baseline justify-between text-[#29261b]/70">
        <span className="font-medium">{label}</span>
        {value != null && (
          <span className="[font-variant-numeric:tabular-nums] text-[#29261b]/50">
            {value}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export function TweakToggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-row items-center justify-between gap-2.5">
      <div className="flex items-baseline justify-between text-[#29261b]/70">
        <span className="font-medium">{label}</span>
      </div>
      <button
        type="button"
        className={cn(
          "relative h-[18px] w-8 cursor-default rounded-full border-0 bg-black/15 p-0 transition-colors",
          value && "bg-[#34c759]",
        )}
        data-on={value ? "1" : "0"}
        role="switch"
        aria-checked={!!value}
        onClick={() => onChange(!value)}
      >
        <i
          className={cn(
            "absolute left-0.5 top-0.5 size-3.5 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.25)] transition-transform",
            value && "translate-x-3.5",
          )}
        />
      </button>
    </div>
  );
}

interface RadioOption {
  value: string;
  label: string;
}

export function TweakRadio({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: RadioOption[];
  onChange: (v: string) => void;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const idx = Math.max(0, options.findIndex((o) => o.value === value));
  const n = options.length;
  const valueRef = useRef(value);
  valueRef.current = value;

  const segAt = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return value;
    const r = track.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor(((clientX - r.left - 2) / inner) * n);
    return options[Math.max(0, Math.min(n - 1, i))].value;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = (ev: PointerEvent) => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <TweakRow label={label}>
      <div
        ref={trackRef}
        role="radiogroup"
        onPointerDown={onPointerDown}
        className="relative flex select-none rounded-lg bg-black/5 p-0.5"
      >
        <div
          className={cn(
            "absolute bottom-0.5 top-0.5 rounded-md bg-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.12)]",
            !dragging && "transition-[left,width] duration-150 ease-[cubic-bezier(.3,.7,.4,1)]",
          )}
          style={{
            left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
            width: `calc((100% - 4px) / ${n})`,
          }}
        />
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={o.value === value}
            className="relative z-[1] min-h-[22px] flex-1 cursor-default rounded-md border-0 bg-transparent px-1.5 py-1 font-medium leading-[1.2] text-inherit [overflow-wrap:anywhere]"
          >
            {o.label}
          </button>
        ))}
      </div>
    </TweakRow>
  );
}
