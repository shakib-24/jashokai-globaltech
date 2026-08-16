const variants = {
  gold: "bg-gold/10 text-gold border-gold/30",
  navy: "bg-navy/5 text-navy border-navy/15",
  palm: "bg-palm/10 text-palm border-palm/25",
  light: "bg-white/10 text-white border-white/25",
  muted: "bg-muted/10 text-muted border-muted/25",
} as const;

export default function Badge({
  children,
  variant = "gold",
  className = "",
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
