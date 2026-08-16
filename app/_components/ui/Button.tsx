import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const variants = {
  primary: "bg-gold text-navy hover:bg-gold-light focus-visible:outline-gold",
  secondary:
    "bg-navy text-white hover:bg-navy-light focus-visible:outline-navy",
  outline:
    "border border-navy/20 text-navy hover:border-navy hover:bg-navy/5 focus-visible:outline-navy",
  "outline-light":
    "border border-white/40 text-white hover:bg-white/10 focus-visible:outline-white",
} as const;

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-base font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

type Variant = keyof typeof variants;

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
  variant?: Variant;
};

export default function Button(props: LinkProps | ButtonProps) {
  const { variant = "primary", className = "", ...rest } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    return (
      <a href={href} className={classes} {...anchorRest}>
        {props.children}
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonRest}>
      {props.children}
    </button>
  );
}
