import type { Metadata } from "next";
import Image from "next/image";
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
  IconLayers,
  IconLanguage,
  IconMic,
  IconBookOpen,
  IconClipboard,
  IconGraduationCap,
  IconShieldCheck,
  IconTarget,
} from "../../_components/ui/icons";

export const metadata: Metadata = {
  title: "JLPT N5 & NAT-TEST 5Q Beginner Japanese Course | JASHOKAI GlobalTech",
  description:
    "Learn what JLPT N5 and NAT-TEST 5Q actually are, how the exams are structured, what passing means, and what you'll learn in JASHOKAI GlobalTech's beginner Japanese N5 course.",
};

const OFFICIAL_JLPT_URL = "https://www.jlpt.jp/?lang=ja";
const OFFICIAL_JLPT_SAMPLES_URL = "https://www.jlpt.jp/samples/forlearners.html";
const OFFICIAL_NAT_TEST_URL = "https://nat-test.jp/";
const OFFICIAL_NAT_TEST_DETAILS_URL = "https://www.nat-test.jp/contents/about.html";

const JLPT_STRUCTURE = [
  {
    icon: IconLayers,
    title: "Vocabulary",
    duration: "20 minutes",
    items: ["Kanji reading", "Orthography", "Vocabulary in context", "Paraphrasing"],
  },
  {
    icon: IconLanguage,
    title: "Grammar & Reading",
    duration: "40 minutes",
    items: [
      "Grammar",
      "Sentence composition",
      "Short reading",
      "Medium reading",
      "Information retrieval",
    ],
  },
  {
    icon: IconMic,
    title: "Listening",
    duration: "30 minutes",
    items: [
      "Task-based comprehension",
      "Key-point comprehension",
      "Verbal expressions",
      "Quick response",
    ],
  },
] as const;

const NAT_STRUCTURE = [
  { icon: IconLayers, title: "Vocabulary", duration: "20 minutes" },
  { icon: IconLanguage, title: "Grammar & Reading", duration: "40 minutes" },
  { icon: IconMic, title: "Listening", duration: "30 minutes" },
] as const;

const COMPARISON_ROWS = [
  { topic: "Level", jlpt: "Beginner", nat: "Beginner" },
  {
    topic: "Relationship",
    jlpt: "JLPT N5",
    nat: "Corresponds approximately to JLPT N5",
  },
  {
    topic: "Sections",
    jlpt: "Vocabulary, Grammar/Reading, Listening",
    nat: "Vocabulary, Grammar/Reading, Listening",
  },
  { topic: "Separate exam?", jlpt: "Yes", nat: "Yes" },
  { topic: "Official organizer", jlpt: "JLPT", nat: "NAT-TEST" },
  {
    topic: "Best for",
    jlpt: "Japanese proficiency certification",
    nat: "Japanese proficiency assessment",
  },
] as const;

const CURRICULUM_ITEMS = [
  "Hiragana",
  "Katakana",
  "Basic Kanji",
  "Essential everyday vocabulary",
  "Beginner grammar",
  "Sentence building",
  "Reading practice",
  "Listening practice",
  "Basic speaking practice",
  "Everyday Japanese",
  "JLPT-style practice",
  "NAT-TEST-style practice",
  "Mock tests and revision",
] as const;

const ROADMAP = [
  { icon: IconTarget, title: "Start from Zero" },
  { icon: IconLanguage, title: "Hiragana & Katakana" },
  { icon: IconLayers, title: "Basic Vocabulary & Grammar" },
  { icon: IconBookOpen, title: "Basic Kanji" },
  { icon: IconBookOpen, title: "Reading & Listening" },
  { icon: IconMic, title: "Speaking Practice" },
  { icon: IconClipboard, title: "JLPT / NAT Practice" },
  { icon: IconGraduationCap, title: "Mock Test & Revision" },
  { icon: IconShieldCheck, title: "Ready for N5 / 5Q" },
] as const;

const WHO_FOR = [
  "Complete beginners",
  "Students starting Japanese from zero",
  "Learners preparing for JLPT N5",
  "Learners preparing for NAT-TEST 5Q",
  "Students who want a strong base before moving to N4",
] as const;

export default function N5CoursePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-navy py-20 text-white sm:py-24 lg:py-28">
        <div className="absolute inset-0">
          <Image
            src="/images/courses/n5.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "35% 50%" }}
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
            <Badge variant="light">JLPT N5</Badge>
            <Badge variant="light">NAT-TEST 5Q</Badge>
            <Badge variant="light">Beginner Level</Badge>
          </div>

          <h1 className="max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Beginner Japanese — N5
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
            Build a strong Japanese foundation and prepare for JLPT N5 or NAT-TEST 5Q.
          </p>

          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
            <Button href="/#contact" variant="primary" className="w-full sm:w-auto">
              Start Your N5 Journey
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

      {/* 2. What is N5 */}
      <Section id="what-is-n5" background="white" ariaLabel="What is JLPT N5">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-5 text-left">
          <SectionHeading eyebrow="Understanding the Exam" title="What is JLPT N5?" align="left" />

          <p className="text-base leading-relaxed text-muted sm:text-lg">
            JLPT N5 is the most basic level of the Japanese-Language Proficiency Test.
          </p>

          <p className="text-base leading-relaxed text-muted sm:text-lg">
            At this level, learners are expected to understand some basic Japanese, including
            simple sentences and expressions written mainly in hiragana, katakana, and basic
            kanji, and to understand short, slow conversations about familiar everyday topics.
          </p>

          <Badge variant="navy">
            <IconShieldCheck width={14} height={14} />
            Based on official JLPT information
          </Badge>
        </div>
      </Section>

      {/* 3. JLPT N5 Exam Structure */}
      <Section id="exam-structure" background="offwhite" ariaLabel="JLPT N5 Exam Structure">
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Exam Format"
            title="JLPT N5 Exam Structure"
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
              Total testing time: 90 minutes
            </p>
            <span className="h-px w-8 bg-gold/50" />
          </div>
        </div>
      </Section>

      {/* 4. JLPT N5 Passing Score */}
      <Section id="passing-score" background="white" ariaLabel="JLPT N5 Passing Score">
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow="Scoring" title="JLPT N5 Passing Score" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2 rounded-2xl bg-navy px-6 py-8 text-center text-white">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-light">
                Overall
              </span>
              <span className="text-4xl font-bold tracking-tight sm:text-5xl">80 / 180</span>
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
              To pass JLPT N5, the learner must meet both the overall pass mark and the minimum
              sectional scores.
            </p>
            <p className="text-sm leading-relaxed text-navy/70">
              Reaching 80 points overall is not enough on its own — falling below the minimum in
              either the Language Knowledge + Reading section or the Listening section results in
              a fail, even if the overall score is high enough.
            </p>
          </div>
        </div>
      </Section>

      {/* 5. NAT-TEST 5Q */}
      <Section id="nat-test" background="offwhite" ariaLabel="What is NAT-TEST 5Q">
        <div className="flex flex-col gap-8">
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-5 text-left">
            <SectionHeading eyebrow="A Separate Exam" title="What is NAT-TEST 5Q?" align="left" />

            <p className="text-base leading-relaxed text-muted sm:text-lg">
              The Japanese Language NAT-TEST has five levels, from 5Q to 1Q.
            </p>

            <p className="text-base leading-relaxed text-muted sm:text-lg">
              <strong className="font-semibold text-navy">
                5Q is the beginner level and is designed to correspond approximately to JLPT N5
                level.
              </strong>
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-white px-6 py-8">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <span className="rounded-full bg-navy px-6 py-3 text-base font-bold text-white">
                JLPT N5
              </span>
              <span aria-hidden className="text-2xl font-bold text-gold">
                ↔
              </span>
              <span className="rounded-full border-2 border-gold bg-gold/10 px-6 py-3 text-base font-bold text-navy">
                NAT-TEST 5Q
              </span>
            </div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted">
              Different exams. Similar beginner proficiency level.
            </p>
          </div>

          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-navy/70">
            NAT-TEST is not JLPT. It has its own registration process, exam schedule,
            administration, and exam system, entirely separate from the Japan Foundation&rsquo;s
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

      {/* 6. NAT-TEST 5Q Exam Structure */}
      <Section id="nat-structure" background="white" ariaLabel="NAT-TEST 5Q Exam Structure">
        <div className="flex flex-col gap-8">
          <SectionHeading eyebrow="Exam Format" title="NAT-TEST 5Q Exam Structure" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {NAT_STRUCTURE.map((section) => (
              <ExamStructureCard key={section.title} {...section} />
            ))}
          </div>

          <div className="mx-auto max-w-2xl rounded-xl border border-gold/25 bg-gold/5 px-5 py-4 text-center">
            <p className="text-sm leading-relaxed text-navy/80">
              Exam formats and official rules may be updated by the exam organizer. Always
              confirm current information from the official NAT-TEST website before applying.
            </p>
          </div>
        </div>
      </Section>

      {/* 7. Comparison Table */}
      <Section id="comparison" background="offwhite" ariaLabel="JLPT vs NAT-TEST Beginner Comparison">
        <div className="flex flex-col gap-8">
          <SectionHeading eyebrow="Side by Side" title="JLPT vs NAT-TEST — Beginner Comparison" />

          <div className="overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="px-5 py-4 font-semibold">Topic</th>
                  <th className="px-5 py-4 font-semibold">JLPT N5</th>
                  <th className="px-5 py-4 font-semibold">NAT-TEST 5Q</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.topic}
                    className={i % 2 === 1 ? "bg-offwhite" : "bg-white"}
                  >
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
      <Section id="curriculum" background="white" ariaLabel="What You Will Learn in Our N5 Course">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-start gap-3 text-left">
            <Badge variant="gold">Our Course Curriculum</Badge>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              What You Will Learn in Our N5 Course
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              This is JASHOKAI GlobalTech&rsquo;s own teaching curriculum, built to prepare
              beginners for real communication and for JLPT N5 / NAT-TEST 5Q — it is not an
              official JLPT or NAT-TEST syllabus.
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

      {/* 9. Learning Roadmap */}
      <Section id="roadmap" background="offwhite" ariaLabel="Learning Roadmap">
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow="Your Path" title="Learning Roadmap" />

          <RoadmapTimeline steps={ROADMAP} />
        </div>
      </Section>

      {/* 10. Sample Question Types */}
      <Section id="sample-questions" background="white" ariaLabel="Sample Question Types">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Practice Style"
            title="Sample Question Types"
            description="Original examples in the style of N5-level questions — not official exam content."
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-offwhite p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gold">
                Vocabulary
              </h3>
              <p className="mt-3 text-2xl font-bold text-navy">学校（がっこう）</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Identify the correct reading or meaning of the word above.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-offwhite p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gold">Grammar</h3>
              <p className="mt-3 text-2xl font-bold text-navy">わたし ___ 学生です。</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Choose the correct particle to complete the sentence.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-offwhite p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gold">Reading</h3>
              <p className="mt-3 rounded-lg border border-dashed border-navy/20 bg-white px-4 py-3 text-base leading-relaxed text-navy">
                としょかんは 月よう日から 金よう日まで あいています。
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Read the short notice and answer a simple question about it.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-offwhite p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gold">
                Listening
              </h3>
              <p className="mt-3 text-base leading-relaxed text-navy">
                Listen to a short everyday conversation and choose the best answer.
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

      {/* 11. Who is this course for */}
      <Section id="who-for" background="offwhite" ariaLabel="Who is this N5 course for">
        <div className="flex flex-col gap-8">
          <SectionHeading eyebrow="Is This For You" title="Who is this N5 course for?" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {WHO_FOR.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-line bg-white px-5 py-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <IconCheck width={15} height={15} strokeWidth={2.25} className="text-gold" />
                </span>
                <span className="text-sm font-medium text-navy sm:text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 12. What comes after N5 */}
      <Section id="after-n5" background="white" ariaLabel="What Comes After N5">
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow="Looking Ahead" title="What Comes After N5?" />

          <div className="flex flex-col gap-8">
            <ProgressionTrack label="JLPT" levels={["N5", "N4", "N3", "N2", "N1"]} highlightIndex={0} />
            <ProgressionTrack
              label="NAT-TEST"
              levels={["5Q", "4Q", "3Q", "2Q", "1Q"]}
              highlightIndex={0}
            />
          </div>

          <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-muted">
            After building a strong N5-level foundation, learners can continue toward N4-level
            Japanese.
          </p>
        </div>
      </Section>

      {/* 13. Official Information & Disclaimer */}
      <Section id="official-info" background="offwhite" ariaLabel="Official Exam Information">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-2xl border border-line bg-white p-7 sm:p-9">
          <div className="flex flex-col items-start gap-2 text-left">
            <h2 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
              Official Exam Information
            </h2>
            <p className="text-base leading-relaxed text-muted">
              Exam structures, scoring rules, test schedules, registration rules, and other
              official requirements may change. Students should always confirm current
              information directly from the official exam websites.
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
            JASHOKAI GlobalTech is an educational institution providing Japanese-language
            preparation. JLPT and NAT-TEST are administered by their respective official
            organizations.
          </p>
        </div>
      </Section>

      {/* 14. Final CTA */}
      <Section background="navy" ariaLabel="Ready to Start Japanese from N5">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <IconFlower width={32} height={32} className="text-gold" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Start Japanese from N5?
          </h2>
          <p className="text-base leading-relaxed text-white/80 sm:text-lg">
            Build your foundation step by step with structured Japanese learning and
            exam-focused practice.
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
