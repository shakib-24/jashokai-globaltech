import type { ComponentType, SVGProps } from "react";
import { IconCheck } from "./icons";

export default function ExamStructureCard({
  icon: Icon,
  title,
  duration,
  items,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  duration?: string;
  items?: readonly string[];
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy/5">
          <Icon width={20} height={20} className="text-gold" />
        </span>
        <div className="flex flex-col">
          <h3 className="text-base font-semibold text-navy">{title}</h3>
          {duration && <span className="text-sm font-medium text-gold">{duration}</span>}
        </div>
      </div>
      {items && (
        <ul className="flex flex-col gap-2 border-t border-line pt-4">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
              <IconCheck
                width={15}
                height={15}
                strokeWidth={2}
                className="mt-0.5 shrink-0 text-gold"
              />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
