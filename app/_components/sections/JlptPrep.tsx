import Section from "../ui/Section";

const STEPS = [
  {
    step: "01",
    title: "Assess Your Level",
    description: "Start from where you are, with a clear view of the level ahead.",
  },
  {
    step: "02",
    title: "Structured Practice",
    description: "Targeted grammar, vocabulary, and Kanji drills for your exam.",
  },
  {
    step: "03",
    title: "Timed Mock Exams",
    description: "Practice under real exam conditions to build confidence.",
  },
  {
    step: "04",
    title: "Review & Feedback",
    description: "Identify weak points and refine your strategy before test day.",
  },
];

const EXAMS = [
  {
    title: "JLPT",
    subtitle: "Japanese Language Proficiency Test",
    description:
      "An internationally recognized test of overall Japanese ability, from N5 through advanced levels.",
  },
  {
    title: "JFT-Basic",
    subtitle: "Japan Foundation Test for Basic Japanese",
    description:
      "A practical Japanese test used for certain work-related visa applications in Japan.",
  },
];

export default function JlptPrep() {
  return (
    <Section id="jlpt-prep" background="offwhite" ariaLabel="JLPT and JFT-Basic Preparation">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-2.5 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Exam Readiness
          </span>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            JLPT & JFT-Basic Preparation
          </h2>
          <p className="mx-auto max-w-[700px] text-base leading-relaxed text-muted sm:text-lg">
            Structured, honest preparation focused on genuine skill-building — not shortcuts.
          </p>
          <div aria-hidden="true" className="mt-1 flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="h-px w-8 bg-gold/60" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {EXAMS.map((exam) => (
            <div key={exam.title} className="rounded-2xl border border-line bg-white p-6">
              <h3 className="text-lg font-semibold text-navy">{exam.title}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gold">
                {exam.subtitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{exam.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item) => (
            <div key={item.step} className="flex flex-col gap-2">
              <span className="text-3xl font-bold text-navy/15">{item.step}</span>
              <h3 className="text-base font-semibold text-navy">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{item.description}</p>
            </div>
          ))}
        </div>

        <p className="text-sm font-medium text-navy/70">
          We do not offer JLPT pass guarantees — our focus is on real, lasting
          Japanese ability.
        </p>
      </div>
    </Section>
  );
}
