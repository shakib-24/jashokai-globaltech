import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Section from "../../_components/ui/Section";
import Container from "../../_components/ui/Container";
import SectionHeading from "../../_components/ui/SectionHeading";
import Button from "../../_components/ui/Button";
import Badge from "../../_components/ui/Badge";
import ExamStructureCard from "../../_components/ui/ExamStructureCard";
import ProgressionTrack from "../../_components/ui/ProgressionTrack";
import RoadmapTimeline from "../../_components/ui/RoadmapTimeline";
import {
  IconFlower,
  IconCheck,
  IconArrowRight,
  IconLayers,
  IconLanguage,
  IconMic,
  IconBookOpen,
  IconClipboard,
  IconGraduationCap,
  IconShieldCheck,
  IconTarget,
  IconUsers,
} from "../../_components/ui/icons";

export const metadata: Metadata = {
  title: "JLPT N4 & NAT-TEST 4Q Elementary Japanese Course | JASHOKAI GlobalTech",
  description:
    "Learn what JLPT N4 and NAT-TEST 4Q actually are, how the exams are structured, what passing means, and what you'll learn in JASHOKAI GlobalTech's elementary Japanese N4 course.",
};

const OFFICIAL_JLPT_URL = "https://www.jlpt.jp/?lang=ja";
const OFFICIAL_JLPT_SAMPLES_URL = "https://www.jlpt.jp/samples/forlearners.html";
const OFFICIAL_NAT_TEST_URL = "https://nat-test.jp/";
const OFFICIAL_NAT_TEST_DETAILS_URL = "https://www.nat-test.jp/contents/about.html";

const JLPT_STRUCTURE = [
  {
    icon: IconLayers,
    title: "Language Knowledge — Vocabulary",
    duration: "25 minutes",
    items: ["Kanji reading", "Orthography", "Vocabulary in context", "Paraphrasing", "Usage"],
  },
  {
    icon: IconLanguage,
    title: "Language Knowledge — Grammar & Reading",
    duration: "55 minutes",
    items: [
      "Grammar",
      "Sentence composition",
      "Text grammar",
      "Short passages",
      "Medium passages",
      "Information retrieval",
    ],
  },
  {
    icon: IconMic,
    title: "Listening",
    duration: "35 minutes",
    items: [
      "Task-based comprehension",
      "Key-point comprehension",
      "Verbal expressions",
      "Quick response",
    ],
  },
] as const;

const NAT_STRUCTURE = [
  { icon: IconLayers, title: "Vocabulary" },
  { icon: IconLanguage, title: "Grammar & Reading" },
  { icon: IconMic, title: "Listening" },
] as const;

const COMPARISON_ROWS = [
  { topic: "Level", jlpt: "Elementary Japanese", nat: "Elementary Japanese" },
  {
    topic: "Relationship",
    jlpt: "JLPT N4",
    nat: "Corresponds approximately to JLPT N4",
  },
  { topic: "Separate exam?", jlpt: "Yes", nat: "Yes" },
  {
    topic: "Main skills",
    jlpt: "Vocabulary, Grammar, Reading, Listening",
    nat: "Vocabulary, Grammar, Reading, Listening",
  },
  { topic: "Administration", jlpt: "JLPT official organizations", nat: "NAT-TEST organization" },
  {
    topic: "Certification",
    jlpt: "JLPT result/certificate system",
    nat: "NAT-TEST result/certificate system",
  },
] as const;

const CURRICULUM_ITEMS = [
  "Review of N5 foundations",
  "Expanded grammar",
  "Expanded everyday vocabulary",
  "More kanji practice",
  "Longer sentence patterns",
  "Everyday conversation",
  "Reading longer passages",
  "Reading notices and practical information",
  "Listening for main points",
  "Listening for important details",
  "Speaking practice",
  "JLPT N4-style practice",
  "NAT-TEST 4Q-style practice",
  "Mock tests",
  "Revision and exam strategy",
] as const;

const N5_TRAITS = [
  "First Japanese foundation",
  "Simple sentences",
  "Basic vocabulary",
  "Basic kanji",
  "Short everyday conversations",
] as const;

const N4_TRAITS = [
  "Broader grammar",
  "More vocabulary and kanji",
  "Longer reading",
  "Better listening comprehension",
  "More practical everyday Japanese",
] as const;

const ROADMAP = [
  { icon: IconShieldCheck, title: "N5 Foundation" },
  { icon: IconLanguage, title: "N4 Grammar" },
  { icon: IconLayers, title: "Expanded Vocabulary" },
  { icon: IconBookOpen, title: "Kanji Development" },
  { icon: IconBookOpen, title: "Reading Practice" },
  { icon: IconMic, title: "Listening Practice" },
  { icon: IconUsers, title: "Speaking & Everyday Japanese" },
  { icon: IconClipboard, title: "JLPT / NAT Practice" },
  { icon: IconGraduationCap, title: "Mock Tests & Revision" },
  { icon: IconTarget, title: "Ready for N4 / 4Q" },
] as const;

const WHO_FOR = [
  "Learners who have completed N5-level Japanese",
  "Students comfortable with Hiragana and Katakana",
  "Students with basic kanji and grammar knowledge",
  "Learners preparing for JLPT N4",
  "Learners preparing for NAT-TEST 4Q",
  "Students planning to progress toward N3",
] as const;

export default function N4CoursePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-navy py-20 text-white sm:py-24 lg:py-28">
        <div className="absolute inset-0">
          <Image
            src="/images/courses/n4.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "50% 40%" }}
          />
          <div className="absolute inset-0 bg-navy/70 lg:hidden" />
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(to right, rgba(8,30,65,0.90) 0%, rgba(8,30,65,0.65) 45%, rgba(8,30,65,0.25) 80%, rgba(8,30,65,0.15) 100%)",
            }}
          />
        </div>

        <Container className="relative flex flex-col items-start gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="light">JLPT N4</Badge>
            <Badge variant="light">NAT-TEST 4Q</Badge>
            <Badge variant="light">Elementary Level</Badge>
          </div>

          <h1 className="max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Japanese N4 — Build Beyond the Basics
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
            Strengthen your grammar, vocabulary, reading and listening skills while preparing
            for JLPT N4 or NAT-TEST 4Q.
          </p>

          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
            <Button href="/#contact" variant="primary" className="w-full sm:w-auto">
              Continue Your Japanese Journey
            </Button>
            <a
              href="#exam-structure"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/85 underline-offset-4 transition-colors hover:text-gold-light hover:underline"
            >
              Explore Exam Details ↓
            </a>
          </div>
        </Container>
      </section>

      {/* 2. What is N4 */}
      <Section id="what-is-n4" background="white" ariaLabel="What is JLPT N4">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-5 text-left">
          <SectionHeading eyebrow="Understanding the Exam" title="What is JLPT N4?" align="left" />

          <p className="text-base leading-relaxed text-muted sm:text-lg">
            JLPT N4 is the level above N5. It tests the ability to understand basic Japanese
            used in everyday situations.
          </p>

          <p className="text-base leading-relaxed text-muted sm:text-lg">
            At this level, learners are expected to understand a broader range of vocabulary,
            kanji, and grammar than at N5, follow longer reading passages, and understand
            conversations at a near-natural pace on familiar everyday topics.
          </p>

          <Badge variant="navy">
            <IconShieldCheck width={14} height={14} />
            Based on official JLPT information
          </Badge>
        </div>
      </Section>

      {/* 3. JLPT N4 Exam Structure */}
      <Section id="exam-structure" background="offwhite" ariaLabel="JLPT N4 Exam Structure">
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Exam Format"
            title="JLPT N4 Exam Structure"
            description="Three sections, each testing a different part of your Japanese ability."
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {JLPT_STRUCTURE.map((section) => (
              <ExamStructureCard key={section.title} {...section} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 text-center">
            <span className="h-px w-8 bg-gold/50" />
            <p className="text-sm font-semibold uppercase tracking-wide text-navy">
              Total testing time: 115 minutes
            </p>
            <span className="h-px w-8 bg-gold/50" />
          </div>
        </div>
      </Section>

      {/* 4. JLPT N4 Passing Score */}
      <Section id="passing-score" background="white" ariaLabel="JLPT N4 Passing Score">
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow="Scoring" title="JLPT N4 Passing Score" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2 rounded-2xl bg-navy px-6 py-8 text-center text-white">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-light">
                Overall
              </span>
              <span className="text-4xl font-bold tracking-tight sm:text-5xl">90 / 180</span>
              <span className="text-sm text-white/70">Overall pass mark</span>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-white px-6 py-8 text-center shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                Language Knowledge + Reading
              </span>
              <span className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">
                38 / 120
              </span>
              <span className="text-sm text-muted">Minimum required</span>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-white px-6 py-8 text-center shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                Listening
              </span>
              <span className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">
                19 / 60
              </span>
              <span className="text-sm text-muted">Minimum required</span>
            </div>
          </div>

          <div className="mx-auto flex max-w-2xl flex-col gap-2 text-left">
            <p className="text-base leading-relaxed text-muted">
              A student must satisfy both the overall score requirement and the minimum
              sectional scores to pass.
            </p>
            <p className="text-sm leading-relaxed text-navy/70">
              Reaching 90 points overall is not enough on its own — falling below the minimum in
              either the Language Knowledge + Reading section or the Listening section results in
              a fail, even if the overall score is high enough.
            </p>
          </div>
        </div>
      </Section>

      {/* 5. NAT-TEST 4Q */}
      <Section id="nat-test" background="offwhite" ariaLabel="What is NAT-TEST 4Q">
        <div className="flex flex-col gap-8">
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-5 text-left">
            <SectionHeading eyebrow="A Separate Exam" title="What is NAT-TEST 4Q?" align="left" />

            <p className="text-base leading-relaxed text-muted sm:text-lg">
              The Japanese Language NAT-TEST has five levels: 5Q → 4Q → 3Q → 2Q → 1Q.
            </p>

            <p className="text-base leading-relaxed text-muted sm:text-lg">
              <strong className="font-semibold text-navy">
                4Q is the level above beginner 5Q and corresponds approximately to JLPT N4
                level.
              </strong>
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-white px-6 py-8">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <span className="rounded-full bg-navy px-6 py-3 text-base font-bold text-white">
                JLPT N4
              </span>
              <span aria-hidden className="text-2xl font-bold text-gold">
                ↔
              </span>
              <span className="rounded-full border-2 border-gold bg-gold/10 px-6 py-3 text-base font-bold text-navy">
                NAT-TEST 4Q
              </span>
            </div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted">
              Different examinations. Similar proficiency level.
            </p>
          </div>

          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-navy/70">
            NAT-TEST is not JLPT. It has its own exam organization, registration process,
            schedule, and official rules, entirely separate from the Japan Foundation&rsquo;s
            JLPT.
          </p>

          <a
            href={OFFICIAL_NAT_TEST_DETAILS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto inline-flex items-center gap-1.5 text-sm font-semibold text-navy underline-offset-4 transition-colors hover:text-gold hover:underline"
          >
            More about NAT-TEST (official site)
            <span aria-hidden>↗</span>
          </a>
        </div>
      </Section>

      {/* 6. NAT-TEST 4Q Exam Structure */}
      <Section id="nat-structure" background="white" ariaLabel="NAT-TEST 4Q Exam Structure">
        <div className="flex flex-col gap-8">
          <SectionHeading eyebrow="Exam Format" title="NAT-TEST 4Q Exam Structure" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {NAT_STRUCTURE.map((section) => (
              <ExamStructureCard key={section.title} {...section} />
            ))}
          </div>

          <div className="mx-auto max-w-2xl rounded-xl border border-gold/25 bg-gold/5 px-5 py-4 text-center">
            <p className="text-sm leading-relaxed text-navy/80">
              NAT-TEST schedules, rules and exam formats may change. Students should confirm
              the latest information from the official NAT-TEST website before applying.
            </p>
          </div>
        </div>
      </Section>

      {/* 7. Comparison Table */}
      <Section id="comparison" background="offwhite" ariaLabel="JLPT N4 vs NAT-TEST 4Q">
        <div className="flex flex-col gap-8">
          <SectionHeading eyebrow="Side by Side" title="JLPT N4 vs NAT-TEST 4Q" />

          <div className="overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="px-5 py-4 font-semibold">Topic</th>
                  <th className="px-5 py-4 font-semibold">JLPT N4</th>
                  <th className="px-5 py-4 font-semibold">NAT-TEST 4Q</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.topic} className={i % 2 === 1 ? "bg-offwhite" : "bg-white"}>
                    <td className="border-t border-line px-5 py-4 font-semibold text-navy">
                      {row.topic}
                    </td>
                    <td className="border-t border-line px-5 py-4 text-muted">{row.jlpt}</td>
                    <td className="border-t border-line px-5 py-4 text-muted">{row.nat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-navy/60">
            Neither certificate is universally &ldquo;better&rdquo; than the other — they serve
            different purposes depending on why you need proof of Japanese ability.
          </p>
        </div>
      </Section>

      {/* 8. Curriculum */}
      <Section id="curriculum" background="white" ariaLabel="What You Will Learn in Our N4 Course">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-start gap-3 text-left">
            <Badge variant="gold">Our Course Curriculum</Badge>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              What You Will Learn in Our N4 Course
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              This is JASHOKAI GlobalTech&rsquo;s own teaching curriculum, built to take
              N5-level learners further toward JLPT N4 / NAT-TEST 4Q — it is not an official
              JLPT or NAT-TEST syllabus.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CURRICULUM_ITEMS.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-line bg-offwhite px-4 py-3.5"
              >
                <IconCheck width={17} height={17} strokeWidth={2.25} className="shrink-0 text-gold" />
                <span className="text-sm font-medium text-navy">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 9. N5 vs N4 */}
      <Section id="n5-vs-n4" background="offwhite" ariaLabel="Moving from N5 to N4">
        <div className="flex flex-col gap-8">
          <SectionHeading eyebrow="Progression" title="Moving from N5 to N4" />

          <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
            <div className="rounded-2xl border border-line bg-white p-6">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                N5
              </span>
              <ul className="mt-3 flex flex-col gap-2.5">
                {N5_TRAITS.map((trait) => (
                  <li key={trait} className="flex items-start gap-2.5 text-sm text-muted">
                    <IconCheck width={15} height={15} strokeWidth={2} className="mt-0.5 shrink-0 text-navy/40" />
                    {trait}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-center py-1">
              <IconArrowRight width={26} height={26} className="hidden text-gold lg:block" />
              <span aria-hidden className="text-2xl font-bold text-gold lg:hidden">
                ↓
              </span>
            </div>

            <div className="rounded-2xl border-2 border-gold bg-gold/5 p-6">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                N4
              </span>
              <ul className="mt-3 flex flex-col gap-2.5">
                {N4_TRAITS.map((trait) => (
                  <li key={trait} className="flex items-start gap-2.5 text-sm font-medium text-navy">
                    <IconCheck width={15} height={15} strokeWidth={2.25} className="mt-0.5 shrink-0 text-gold" />
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-muted">
            N4 is not starting again from zero. It builds directly on a strong N5-level
            foundation.
          </p>
        </div>
      </Section>

      {/* 10. Learning Roadmap */}
      <Section id="roadmap" background="white" ariaLabel="Learning Roadmap">
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow="Your Path" title="Learning Roadmap" />

          <RoadmapTimeline steps={ROADMAP} />
        </div>
      </Section>

      {/* 11. Sample Question Types */}
      <Section id="sample-questions" background="offwhite" ariaLabel="Sample Question Types">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Practice Style"
            title="Sample Question Types"
            description="Original examples in the style of N4-level questions — not official exam content."
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gold">
                Vocabulary
              </h3>
              <p className="mt-3 text-2xl font-bold text-navy">説明（せつめい）</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Identify the correct reading or meaning of the word above.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gold">Grammar</h3>
              <p className="mt-3 text-2xl font-bold text-navy">
                雨（あめ）が 降（ふ）って いる ___、 出（で）かけません。
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Choose the correct connector to complete the sentence.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gold">Reading</h3>
              <p className="mt-3 rounded-lg border border-dashed border-navy/20 bg-offwhite px-4 py-3 text-base leading-relaxed text-navy">
                来週（らいしゅう）の 会議（かいぎ）は 3時（さんじ）から 4時（よじ）までです。場所（ばしょ）は
                いつもの 部屋（へや）です。
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Read the short notice and answer a simple question about it.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gold">
                Listening
              </h3>
              <p className="mt-3 text-base leading-relaxed text-navy">
                Listen to an everyday conversation and identify the main point or the correct
                response.
              </p>
            </div>
          </div>

          <a
            href={OFFICIAL_JLPT_SAMPLES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-navy underline-offset-4 transition-colors hover:text-gold hover:underline"
          >
            View Official JLPT Sample Questions
            <span aria-hidden>↗</span>
          </a>
        </div>
      </Section>

      {/* 12. Who is this course for */}
      <Section id="who-for" background="white" ariaLabel="Who is this N4 course for">
        <div className="flex flex-col gap-6">
          <SectionHeading eyebrow="Is This For You" title="Who is this N4 course for?" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {WHO_FOR.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-line bg-offwhite px-5 py-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <IconCheck width={15} height={15} strokeWidth={2.25} className="text-gold" />
                </span>
                <span className="text-sm font-medium text-navy sm:text-base">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-navy/60">
            New to Japanese?{" "}
            <Link
              href="/courses/n5"
              className="font-semibold text-gold underline-offset-4 hover:underline"
            >
              Start with our N5 course
            </Link>{" "}
            to build the foundation N4 builds on.
          </p>
        </div>
      </Section>

      {/* 13. What comes after N4 */}
      <Section id="after-n4" background="offwhite" ariaLabel="What Comes After N4">
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow="Looking Ahead" title="What Comes After N4?" />

          <div className="flex flex-col gap-8">
            <ProgressionTrack label="JLPT" levels={["N5", "N4", "N3", "N2", "N1"]} highlightIndex={1} />
            <ProgressionTrack
              label="NAT-TEST"
              levels={["5Q", "4Q", "3Q", "2Q", "1Q"]}
              highlightIndex={1}
            />
          </div>

          <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-muted">
            After developing a strong N4 foundation, learners can continue toward N3-level
            Japanese.
          </p>
        </div>
      </Section>

      {/* 14. Official Information & Disclaimer */}
      <Section id="official-info" background="white" ariaLabel="Official Exam Information">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-2xl border border-line bg-offwhite p-7 sm:p-9">
          <div className="flex flex-col items-start gap-2 text-left">
            <h2 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
              Official Exam Information
            </h2>
            <p className="text-base leading-relaxed text-muted">
              Exam schedules, test times, scoring rules, registration procedures and other
              official requirements may change. Students should always verify the latest
              information through the official exam organizations.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={OFFICIAL_JLPT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-navy/20 px-6 text-sm font-semibold text-navy transition-colors hover:border-navy hover:bg-navy/5"
            >
              日本語能力試験 JLPT 公式サイト
              <span aria-hidden>↗</span>
            </a>
            <a
              href={OFFICIAL_NAT_TEST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-navy/20 px-6 text-sm font-semibold text-navy transition-colors hover:border-navy hover:bg-navy/5"
            >
              日本語NAT-TEST 公式サイト
              <span aria-hidden>↗</span>
            </a>
          </div>

          <p className="border-t border-line pt-5 text-xs leading-relaxed text-navy/60">
            JASHOKAI GlobalTech provides Japanese-language education and exam preparation.
            JLPT and NAT-TEST are administered by their respective official organizations.
          </p>
        </div>
      </Section>

      {/* 15. Final CTA */}
      <Section background="navy" ariaLabel="Ready to Take the Next Step After N5">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <IconFlower width={32} height={32} className="text-gold" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Take the Next Step After N5?
          </h2>
          <p className="text-base leading-relaxed text-white/80 sm:text-lg">
            Strengthen your Japanese and prepare step by step for JLPT N4 or NAT-TEST 4Q.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/#contact" variant="primary" className="w-full sm:w-auto">
              Contact Us
            </Button>
            <Button href="/#courses" variant="outline-light" className="w-full sm:w-auto">
              Back to Japanese Courses
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
