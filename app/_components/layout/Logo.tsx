import Image from "next/image";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <Image
        src="/images/logo.png"
        alt="JASHOKAI GlobalTech logo"
        width={34}
        height={34}
        className="h-[34px] w-[34px] shrink-0 object-contain"
      />
      <span className="flex flex-col leading-tight">
        <span
          className={`text-lg font-bold tracking-tight ${
            light ? "text-white" : "text-navy"
          }`}
        >
          JASHOKAI
        </span>
        <span
          className={`text-[11px] font-medium uppercase tracking-[0.18em] ${
            light ? "text-white/70" : "text-muted"
          }`}
        >
          GlobalTech
        </span>
      </span>
    </a>
  );
}
