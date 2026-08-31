import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Activity, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, Mono, Reveal } from "./shared";

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden bg-background pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container-hz relative">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Safe Flow</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 text-left text-4xl leading-[1.04] font-semibold tracking-tight text-balance md:text-6xl lg:text-7xl">
                Detect. Investigate. Explain. Decide.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-left text-base leading-relaxed text-muted-foreground md:text-lg">
                Safe Flow helps financial institutions convert suspicious activity into a disciplined,
                auditable investigation workflow with clear risk assessment and regulatory context.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-xl shadow-sm">
                  <Link to="/sign-in">
                    Launch Investigator <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl border-border bg-background">
                  <a href="#platform">Explore the Platform</a>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
                {["RISK REVIEW", "REGULATORY CONTEXT", "AUDIT TRAIL"].map((item) => (
                  <Mono key={item} className="eyebrow text-muted-foreground">
                    {item}
                  </Mono>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={220}>
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-8 rounded-[2rem] bg-violet/10 blur-3xl" aria-hidden />
              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85"
                    alt="Secure digital infrastructure representing Safe Flow security monitoring"
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-background/95 via-background/35 to-transparent" />

                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md">
                    <span className="size-2 animate-pulse rounded-full bg-teal" />
                    Security monitoring active
                  </div>

                  <div className="absolute inset-x-5 bottom-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-black/55 p-4 text-white backdrop-blur-md">
                      <div className="flex items-center gap-2 text-teal">
                        <ShieldCheck className="size-4" />
                        <Mono className="text-white/70">PROTECTION</Mono>
                      </div>
                      <p className="mt-2 text-lg font-semibold">Continuous risk visibility</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/55 p-4 text-white backdrop-blur-md">
                      <div className="flex items-center gap-2 text-violet">
                        <Activity className="size-4" />
                        <Mono className="text-white/70">INTELLIGENCE</Mono>
                      </div>
                      <p className="mt-2 text-lg font-semibold">Explainable decisions</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border bg-background/95 px-5 py-4">
                  <div>
                    <Mono className="text-muted-foreground">SAFE FLOW INTELLIGENCE</Mono>
                    <p className="mt-1 text-sm font-medium">From suspicious signal to defensible action.</p>
                  </div>
                  <LockKeyhole className="size-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}