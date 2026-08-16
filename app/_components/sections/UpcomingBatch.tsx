import Section from "../ui/Section";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { IconCalendar } from "../ui/icons";

export default function UpcomingBatch() {
  return (
    <Section id="notice" background="offwhite" ariaLabel="Notice">
      <div className="flex flex-col items-start gap-6 rounded-3xl border border-line bg-white p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-palm/10 text-palm">
            <IconCalendar width={24} height={24} />
          </span>
          <div className="flex flex-col gap-2">
            <Badge variant="palm">Notice</Badge>
            <h2 className="text-xl font-semibold text-navy sm:text-2xl">
              New Batches Forming Regularly
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              We open new N5 and N4 batches on a rolling basis. Reach out to
              us for the next available start date and seat availability.
            </p>
          </div>
        </div>

        <Button href="#contact" variant="secondary" className="w-full sm:w-auto">
          Ask About the Next Batch
        </Button>
      </div>
    </Section>
  );
}
