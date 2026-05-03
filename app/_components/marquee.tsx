const ITEMS = [
  "Salle de montre - Montréal",
  "Armoires en contreplaqué - HDF",
  "Soumission en ligne",
];

export function Marquee() {
  return (
    <div className="border-b border-border bg-background px-[clamp(20px,4vw,56px)] py-7 flex justify-between items-center gap-10 flex-wrap text-xs tracking-[0.08em] text-muted-foreground uppercase">
      {ITEMS.map((label) => (
        <div key={label} className="flex items-center gap-2.5">
          <span className="w-1 h-1 rounded-full bg-primary"></span>
          {label}
        </div>
      ))}
    </div>
  );
}
