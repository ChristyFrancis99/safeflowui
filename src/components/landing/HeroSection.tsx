import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, Mono, Reveal } from "./shared";

export function HeroSection() {
  return (
    <section id="top" className="border-b border-border bg-background py-16 md:py-20">
      <div className="container-hz">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] xl:gap-14">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Safe Flow</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-4 text-left text-4xl font-semibold leading-[1.08] tracking-tight text-balance md:text-5xl lg:text-6xl">
                Detect. Investigate. Explain. Decide.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-xl text-left text-sm leading-relaxed text-muted-foreground md:text-base">
                Safe Flow helps financial institutions convert suspicious activity into a disciplined,
                auditable investigation workflow with clear risk assessment and regulatory context.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-md">
                  <Link to="/sign-in">
                    Launch Investigator
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-md border-border bg-background">
                  <a href="#platform">Explore the Platform</a>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-7 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                {["RISK REVIEW", "REGULATORY CONTEXT", "AUDIT TRAIL"].map((item) => (
                  <div key={item} className="border-l-2 border-primary pl-3">
                    <Mono className="text-muted-foreground">{item}</Mono>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <div className="flex min-h-[320px] items-center justify-end border border-border bg-card p-5 lg:min-h-[380px]">
              <img
                src="/pay-safe-stay-secure.png"
                alt="Safe Flow security shield illustration"
                className="h-auto w-full max-w-[600px] object-contain object-right"
                loading="eager"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
