import Image from "next/image";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-navy py-20 text-white sm:py-24 lg:py-28"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/Hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_30%] lg:object-[50%_25%]"
        />
        {/* Mobile/tablet: full-width text needs a uniform scrim over the whole image */}
        <div className="absolute inset-0 bg-navy/65 lg:hidden" />
        {/* Desktop: text sits only on the left, so keep the right side (Fuji + pagoda) bright */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, rgba(8,30,65,0.88) 0%, rgba(8,30,65,0.60) 40%, rgba(8,30,65,0.10) 75%, transparent 100%)",
          }}
        />
      </div>

      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div className="flex flex-col items-start gap-6">
          <Badge variant="light">Phase 1 · Now Enrolling</Badge>

          <h1 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Learn Japanese. Build Your Future.
          </h1>

          <p className="max-w-lg text-lg font-medium text-gold-light">
            Start Your Japanese Journey from Jashore
          </p>

          <p className="max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            JASHOKAI GlobalTech currently offers professional, structured
            Japanese language education — from beginner fundamentals to JLPT
            and JFT-Basic preparation — guided by qualified teachers.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="#courses" variant="primary" className="w-full sm:w-auto">
              View Japanese Courses
            </Button>
            <Button href="#contact" variant="outline-light" className="w-full sm:w-auto">
              Book Free Consultation
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
