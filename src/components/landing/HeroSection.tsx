import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Activity, Network, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, Mono, Reveal } from "./shared";

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden bg-background py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
        <div className="absolute right-[-12%] top-[-8%] h-[440px] w-[440px] rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute left-[-18%] bottom-[-25%] h-[340px] w-[340px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container-hz relative">
        <div className="grid items-center gap-8 lg:grid-cols-[0.88fr_1.12fr] xl:gap-4">
          <div className="relative z-10 max-w-2xl lg:pr-6">
            <Reveal><Eyebrow>Safe Flow</Eyebrow></Reveal>
            <Reveal delay={80}>
              <h1 className="mt-4 text-left text-4xl leading-[1.04] font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl">
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
              <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-md">
                  <Link to="/sign-in">Launch Investigator <ArrowRight className="size-4" aria-hidden /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-md border-border bg-background">
                  <a href="#platform">Explore the Platform</a>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-6 grid max-w-xl grid-cols-1 gap-2.5 sm:grid-cols-3">
                {["RISK REVIEW", "REGULATORY CONTEXT", "AUDIT TRAIL"].map((item) => (
                  <div key={item} className="border-l border-primary pl-3"><Mono className="text-muted-foreground">{item}</Mono></div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <div className="relative mx-auto flex min-h-[340px] w-full max-w-[620px] items-center justify-center">
              <div className="absolute inset-10 rounded-full border border-primary/20 bg-primary/5 blur-2xl" aria-hidden />
              <div className="relative w-full max-w-[560px] rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-float)]">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <Mono className="text-muted-foreground">LIVE INVESTIGATION SIGNALS</Mono>
                    <p className="mt-1 text-sm font-semibold text-foreground">Case intelligence overview</p>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal/10 px-2 py-1 text-[10px] font-semibold text-teal"><Activity className="size-3" /> ACTIVE</span>
                </div>
                <div className="grid gap-3 pt-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-border bg-background p-4"><ShieldCheck className="size-5 text-risk-high" /><p className="mt-3 text-2xl font-semibold text-foreground">86</p><Mono className="text-muted-foreground">RISK SCORE</Mono></div>
                  <div className="rounded-xl border border-border bg-background p-4"><Network className="size-5 text-violet" /><p className="mt-3 text-2xl font-semibold text-foreground">12</p><Mono className="text-muted-foreground">LINKED SIGNALS</Mono></div>
                  <div className="rounded-xl border border-border bg-background p-4"><FileCheck className="size-5 text-teal" /><p className="mt-3 text-2xl font-semibold text-foreground">4</p><Mono className="text-muted-foreground">AI AGENTS</Mono></div>
                </div>
                <div className="mt-3 rounded-xl border border-border bg-background p-4">
                  <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Investigation confidence</span><span className="font-mono text-foreground">92%</span></div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full w-[92%] rounded-full bg-violet" /></div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
