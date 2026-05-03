import type { ColorName, Molding, Product } from "@/lib/types";

interface PaletteEntry {
  door: string;
  shadow: string;
  edge: string;
  interior: string;
  knob: string;
}

const COLOR_MAP: Record<ColorName, PaletteEntry> = {
  "Blanc Pur":   { door: "#f5f1e8", shadow: "#d8d0bc", edge: "#a99e80", interior: "#efe9d9", knob: "#1f2622" },
  "Chêne blanc": { door: "#cba578", shadow: "#9a7a51", edge: "#6e5132", interior: "#e6d2b0", knob: "#1a1410" },
  "Bleu marin":  { door: "#1f3245", shadow: "#0e1c2a", edge: "#091421", interior: "#384a5d", knob: "#c8b890" },
};

interface Props {
  product: Product;
  color: ColorName;
  molding: Molding;
}

interface PanelRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function ModuleRender({ product, color, molding }: Props) {
  const c = COLOR_MAP[color] || COLOR_MAP["Blanc Pur"];
  const family = product.family;
  const w = product.w || 24;
  const h = product.h || 30;
  const isCorner = (product.corner || "Non") !== "Non";
  const corner45 = product.corner === "Coin 45 degres";
  const isPantry = family.includes("Garde-manger");
  const moldingW = molding === "3 po" ? 0.16 : 0.07;

  const viewW = 200;
  const viewH = 240;
  const padX = 30;
  const padY = 20;
  const boxW = viewW - padX * 2;
  const boxH = viewH - padY * 2;
  const ratio = w / h;
  let dw: number, dh: number;
  if (ratio >= 1) {
    dw = boxW;
    dh = Math.max(boxH * 0.45, boxW / Math.max(0.6, ratio));
  } else {
    dh = boxH;
    dw = Math.max(boxW * 0.35, boxH * Math.max(0.35, ratio));
  }
  const x0 = (viewW - dw) / 2;
  const y0 = (viewH - dh) / 2;

  const doorCount = product.doors || 1;
  const doorPadding = dw * 0.025;
  const totalGap = doorPadding * (doorCount + 1);
  const doorW = (dw - totalGap) / doorCount;

  const panels: PanelRect[] = [];
  if (isPantry && h >= 60) {
    const splitY = y0 + dh * 0.5;
    panels.push({
      x: x0 + doorPadding,
      y: y0 + doorPadding,
      w: dw - doorPadding * 2,
      h: dh / 2 - doorPadding * 1.5,
    });
    panels.push({
      x: x0 + doorPadding,
      y: splitY + doorPadding * 0.5,
      w: dw - doorPadding * 2,
      h: dh / 2 - doorPadding * 1.5,
    });
  } else {
    for (let i = 0; i < doorCount; i++) {
      panels.push({
        x: x0 + doorPadding + i * (doorW + doorPadding),
        y: y0 + doorPadding,
        w: doorW,
        h: dh - doorPadding * 2,
      });
    }
  }

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}
    >
      <ellipse cx={viewW / 2} cy={y0 + dh + 8} rx={dw * 0.46} ry="3" fill="rgba(0,0,0,0.08)" />
      <rect x={x0 - 1} y={y0 - 1} width={dw + 2} height={dh + 2} fill={c.edge} opacity="0.5" />
      <rect x={x0} y={y0} width={dw} height={dh} fill={c.shadow} />
      <rect x={x0 + 2} y={y0 + 2} width={dw - 4} height={dh - 4} fill={c.door} />
      {panels.map((p, i) => (
        <DoorPanel key={i} {...p} color={c} moldingW={moldingW} />
      ))}
      {panels.map((p, i) => {
        const isWideDoor = p.w > dw * 0.5;
        const knobX = isWideDoor
          ? p.x + p.w * 0.5
          : i % 2 === 0
          ? p.x + p.w - 5
          : p.x + 5;
        const knobY = isPantry ? p.y + p.h - 8 : p.y + p.h * 0.5;
        return <circle key={`k${i}`} cx={knobX} cy={knobY} r="1.4" fill={c.knob} />;
      })}
      <g opacity="0.55">
        <line x1={x0} y1={y0 + dh + 14} x2={x0 + dw} y2={y0 + dh + 14} stroke={c.edge} strokeWidth="0.5" />
        <line x1={x0} y1={y0 + dh + 11} x2={x0} y2={y0 + dh + 17} stroke={c.edge} strokeWidth="0.5" />
        <line x1={x0 + dw} y1={y0 + dh + 11} x2={x0 + dw} y2={y0 + dh + 17} stroke={c.edge} strokeWidth="0.5" />
      </g>
      <text
        x={viewW / 2}
        y={y0 + dh + 22}
        textAnchor="middle"
        fontSize="7"
        fontFamily="ui-monospace, monospace"
        fill="rgba(60,55,40,0.6)"
        letterSpacing="0.5"
      >
        {w}″
      </text>
      {isCorner && (
        <g>
          <rect x="6" y="6" width="48" height="14" fill="rgba(255,255,255,0.85)" stroke="rgba(0,0,0,0.1)" />
          <text x="30" y="15" textAnchor="middle" fontSize="6" fontFamily="ui-monospace, monospace" letterSpacing="0.5" fill="#253b2f">
            {corner45 ? "COIN 45°" : "COIN 90°"}
          </text>
        </g>
      )}
    </svg>
  );
}

interface DoorPanelProps extends PanelRect {
  color: PaletteEntry;
  moldingW: number;
}

function DoorPanel({ x, y, w, h, color, moldingW }: DoorPanelProps) {
  const m = Math.min(w, h) * moldingW;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={color.door} />
      <rect x={x + m} y={y + m} width={w - m * 2} height={h - m * 2} fill={color.shadow} opacity="0.55" />
      <rect x={x + m + 0.5} y={y + m + 0.5} width={w - m * 2 - 1} height={h - m * 2 - 1} fill={color.door} />
      <rect x={x} y={y} width={w} height="0.6" fill="rgba(255,255,255,0.12)" />
    </g>
  );
}
