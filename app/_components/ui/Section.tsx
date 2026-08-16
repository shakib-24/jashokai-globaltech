import Container from "./Container";

const backgrounds = {
  white: "bg-white",
  offwhite: "bg-offwhite",
  navy: "bg-navy text-white",
} as const;

export default function Section({
  id,
  children,
  className = "",
  background = "white",
  ariaLabel,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  background?: keyof typeof backgrounds;
  ariaLabel?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`scroll-mt-20 py-16 sm:py-20 lg:py-24 ${backgrounds[background]} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
