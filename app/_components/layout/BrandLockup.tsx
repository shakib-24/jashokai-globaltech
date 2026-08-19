import Image from "next/image";

export default function BrandLockup({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-3">
      <Image
        src="/images/logo.png"
        alt="JASHOKAI GlobalTech logo"
        width={42}
        height={42}
        className={`h-9 w-9 shrink-0 object-contain sm:h-[42px] sm:w-[42px] ${
          light ? "drop-shadow-[0_0_10px_rgba(0,0,0,0.25)]" : ""
        }`}
      />
      <span className="flex flex-col justify-center gap-0.5">
        <span
          className={`text-lg font-extrabold leading-none tracking-tight sm:text-xl ${
            light ? "text-white" : "text-navy"
          }`}
        >
          JASHOKAI
        </span>
        <span className="hidden items-baseline gap-0.5 text-[11px] font-bold uppercase leading-none tracking-[0.16em] sm:flex">
          <span className={light ? "text-white" : "text-navy"}>Global</span>
          <span className="text-gold">Tech</span>
        </span>
        <span
          className={`hidden text-[9px] font-semibold uppercase leading-none tracking-[0.13em] sm:block ${
            light ? "text-white/60" : "text-muted"
          }`}
        >
          Languages&nbsp;&nbsp;&nbsp;Study Abroad&nbsp;&nbsp;&nbsp;IT Careers
        </span>
      </span>
    </a>
  );
}
