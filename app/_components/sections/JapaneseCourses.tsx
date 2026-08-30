import Image from "next/image";
import Link from "next/link";
import Section from "../ui/Section";
import {
  IconFlower,
  IconGraduationCap,
  IconBriefcase,
  IconCheck,
  IconArrowRight,
} from "../ui/icons";

const COURSES = [
  {
    category: "Japanese Language",
    title: "N5",
    level: "Beginner",
    icon: IconFlower,
    accent: "sakura",
    image: "/images/courses/n5.jpg",
    imageAlt: "Cherry blossoms along a bamboo forest path in Japan",
    objectPosition: "35% 50%",
    href: "/courses/n5",
    areas: [
      "Hiragana & Katakana",
      "Basic Kanji",
      "Grammar & Vocabulary",
      "Listening & Speaking",
      "Practical Japanese",
    ],
  },
  {
    category: "Japanese Language",
    title: "N4",
    level: "Elementary",
    icon: IconFlower,
    accent: "ocean",
    image: "/images/courses/n4.jpg",
    imageAlt: "Tokyo Skytree and cherry blossoms lit up at night",
    objectPosition: "50% 40%",
    href: "/courses/n4",
    areas: [
      "Expanded Grammar",
      "Expanded Vocabulary",
      "Kanji",
      "Reading & Listening",
      "Conversation",
    ],
  },
  {
    category: "Exam Preparation",
    title: "JLPT Preparation",
    level: "All Levels",
    icon: IconGraduationCap,
    accent: "navy",
    image: "/images/courses/jlpt.jpg",
    imageAlt: "Traditional Japanese temple and pagoda at golden hour",
    objectPosition: "55% 45%",
    href: undefined,
    areas: [
      "Grammar & Vocabulary",
      "Reading Strategy",
      "Listening Practice",
      "Practice Tests",
      "Exam Preparation",
    ],
  },
  {
    category: "Practical Japanese",
    title: "JFT-Basic Preparation",
    level: "Work-Ready",
    icon: IconBriefcase,
    accent: "palm",
    image: "/images/courses/jft.jpg",
    imageAlt: "Colorful tulip garden in bloom",
    objectPosition: "50% 60%",
    href: undefined,
    areas: [
      "Everyday Japanese",
      "Workplace Vocabulary",
      "Listening",
      "Practical Communication",
      "Test Preparation",
    ],
  },
] as const;

const ACCENTS = {
  sakura: {
    icon: "text-sakura",
    category: "text-sakura-light",
    divider: "bg-sakura",
    check: "text-sakura",
    rgb: "193,73,83",
  },
  ocean: {
    icon: "text-ocean",
    category: "text-ocean-light",
    divider: "bg-ocean",
    check: "text-ocean",
    rgb: "27,79,145",
  },
  palm: {
    icon: "text-palm",
    category: "text-palm-light",
    divider: "bg-palm",
    check: "text-palm",
    rgb: "47,107,79",
  },
  navy: {
    icon: "text-gold",
    category: "text-gold-light",
    divider: "bg-gold",
    check: "text-gold",
    rgb: "10,31,68",
  },
} as const;

export default function JapaneseCourses() {
  return (
    <Section
      id="courses"
      background="white"
      ariaLabel="Japanese Courses"
      className="!py-12 sm:!py-16 lg:!py-20"
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            Phase 1 · Active Service
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Japanese Courses
          </h2>
          <div aria-hidden className="flex items-center gap-2">
            <span className="h-px w-8 bg-gold/50" />
            <IconFlower width={16} height={16} className="text-gold" />
            <span className="h-px w-8 bg-gold/50" />
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            Structured Japanese language courses designed for practical
            communication and exam preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COURSES.map((course) => {
            const Icon = course.icon;
            const accent = ACCENTS[course.accent];

            return (
              <div
                key={course.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm"
              >
                <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: course.objectPosition }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, rgba(${accent.rgb},0.85) 0%, rgba(${accent.rgb},0.35) 42%, rgba(${accent.rgb},0) 75%)`,
                    }}
                  />

                  <div className="absolute inset-x-0 bottom-0 flex items-end gap-2.5 p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                      <Icon width={18} height={18} className={accent.icon} />
                    </span>
                    <div className="flex flex-col gap-0.5 pb-0.5">
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-[0.12em] ${accent.category}`}
                      >
                        {course.category}
                      </span>
                      <span className="text-lg font-bold leading-tight text-white">
                        {course.title}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative flex flex-1 flex-col gap-3 px-5 py-5">
                  <svg
                    aria-hidden
                    viewBox="0 0 100 100"
                    className="pointer-events-none absolute -bottom-5 -right-5 h-24 w-24 text-navy opacity-[0.04]"
                  >
                    <path
                      d="M0 25h100M0 50h100M0 75h100M25 0v100M50 0v100M75 0v100"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>

                  <div className="relative z-10 flex flex-1 flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                        {course.level}
                      </span>
                      <span className={`h-px w-8 ${accent.divider}`} />
                    </div>

                    <ul className="flex flex-1 flex-col gap-2">
                      {course.areas.map((area) => (
                        <li
                          key={area}
                          className="flex items-center gap-2.5 text-sm text-navy/80"
                        >
                          <IconCheck
                            width={16}
                            height={16}
                            strokeWidth={2}
                            className={`shrink-0 ${accent.check}`}
                          />
                          {area}
                        </li>
                      ))}
                    </ul>

                    {course.href && (
                      <Link
                        href={course.href}
                        className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors hover:text-navy"
                      >
                        Learn More
                        <IconArrowRight width={14} height={14} strokeWidth={2.25} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
