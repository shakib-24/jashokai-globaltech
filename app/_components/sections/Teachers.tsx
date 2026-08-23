import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Badge from "../ui/Badge";

// Placeholder profiles — development content only.
// Replace with real teacher names, photos, and verified qualifications
// before this section goes live.
const PLACEHOLDER_TEACHERS = [
  { initials: "T1", name: "Teacher Name", role: "Japanese Language Instructor" },
  { initials: "T2", name: "Teacher Name", role: "Japanese Language Instructor" },
  { initials: "T3", name: "Teacher Name", role: "Japanese Language Instructor" },
];

export default function Teachers() {
  return (
    <Section id="teachers" background="white" ariaLabel="Teachers">
      <div className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Our Teachers"
          title="Guided by Dedicated Instructors"
          description="Teacher profiles are being finalized and will be published soon."
          align="center"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PLACEHOLDER_TEACHERS.map((teacher, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-line bg-offwhite p-6 text-center"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy/10 text-lg font-semibold text-navy">
                {teacher.initials}
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-base font-semibold text-navy">{teacher.name}</span>
                <span className="text-sm text-muted">{teacher.role}</span>
              </div>
              <Badge variant="red">Profile Coming Soon</Badge>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted">
          Placeholder content for development purposes — real teacher details
          will replace these cards before launch.
        </p>
      </div>
    </Section>
  );
}
