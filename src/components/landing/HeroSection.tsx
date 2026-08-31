import { Link } from "@tanstack/react-router";
import { Activity, ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, Mono, Reveal } from "./shared";

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden bg-background pt-24 pb-20 md:pt-32 md:pb-24">
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
        <div className="absolute right-[-12%] top-[-8%] h-[520px] w-[520px] rounded-full bg-violet/10 blur-3xl" />
        <div className="absolute left-[-18%] bottom-[-25%] h-[420px] w-[420px] rounded-full bg-teal/5 blur-3xl" />
      </div>

      <div className="container-hz relative">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 xl:grid-cols-[0.88fr_1.12fr]">
          <div className="max-w-2xl lg:pr-4">
            <Reveal><Eyebrow>Safe Flow</Eyebrow></Reveal>
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
                <Button asChild size="lg" className="rounded-xl shadow-sm"><Link to="/sign-in">Launch Investigator <ArrowRight className="size-4" aria-hidden /></Link></Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl border-border bg-background"><a href="#platform">Explore the Platform</a></Button>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                {["RISK REVIEW", "REGULATORY CONTEXT", "AUDIT TRAIL"].map((item) => <div key={item} className="border-l border-border pl-3"><Mono className="text-muted-foreground">{item}</Mono></div>)}
              </div>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <div className="relative mx-auto w-full max-w-2xl lg:-mr-6">
              <div className="absolute -inset-8 rounded-[3rem] bg-violet/10 blur-3xl" aria-hidden />
              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-[var(--shadow-float)]">
                <div className="relative aspect-[1.08/1] overflow-hidden sm:aspect-[1.2/1]">
                  <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=85" alt="Dark blue cybersecurity technology visual for Safe Flow" className="h-full w-full object-cover" loading="eager" />
                  <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/20 to-violet/25" />
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background/90 to-transparent" />
                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md"><span className="size-2 animate-pulse rounded-full bg-teal" />Security monitoring active</div>
                  <div className="absolute left-5 bottom-5 right-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-xs rounded-2xl border border-white/10 bg-black/55 p-4 text-white backdrop-blur-md"><div className="flex items-center gap-2 text-teal"><ShieldCheck className="size-4" aria-hidden /><Mono className="text-white/70">PROTECTION</Mono></div><p className="mt-2 text-lg font-semibold">Continuous risk visibility</p></div>
                    <div className="rounded-2xl border border-white/10 bg-black/55 px-4 py-3 text-white backdrop-blur-md"><div className="flex items-center gap-2 text-violet"><Activity className="size-4" aria-hidden /><Mono className="text-white/70">INTELLIGENCE</Mono></div><p className="mt-1 text-sm font-medium">Explainable decisions</p></div>
                  </div>
                </div>
                <div className="grid gap-3 border-t border-border bg-background/95 p-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border bg-card px-4 py-3"><Mono className="text-muted-foreground">RISK STATUS</Mono><div className="mt-1 flex items-center gap-2"><span className="size-2 rounded-full bg-violet" /><span className="text-sm font-semibold">High-risk signal detected</span></div></div>
                  <div className="rounded-xl border border-border bg-card px-4 py-3"><Mono className="text-muted-foreground">CASE CONTROL</Mono><div className="mt-1 flex items-center gap-2"><LockKeyhole className="size-4 text-teal" aria-hidden /><span className="text-sm font-semibold">Audit trail protected</span></div></div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
