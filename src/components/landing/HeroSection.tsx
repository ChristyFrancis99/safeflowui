import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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
        <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] xl:gap-6">
          <div className="relative z-10 max-w-2xl lg:pr-8">
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
                <Button asChild size="lg" className="rounded-xl shadow-sm">
                  <Link to="/sign-in">Launch Investigator <ArrowRight className="size-4" aria-hidden /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl border-border bg-background">
                  <a href="#platform">Explore the Platform</a>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                {["RISK REVIEW", "REGULATORY CONTEXT", "AUDIT TRAIL"].map((item) => (
                  <div key={item} className="border-l border-border pl-3">
                    <Mono className="text-muted-foreground">{item}</Mono>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <div className="relative -mr-8 flex min-h-[420px] items-center justify-end lg:-mr-20 xl:-mr-28">
              <div className="absolute right-0 top-1/2 h-[560px] w-[760px] -translate-y-1/2 rounded-full bg-violet/10 blur-3xl" aria-hidden />
              <img
                src="/pay-safe-stay-secure.png"
                alt="Safe Flow security shield illustration"
                className="relative z-10 h-auto w-full max-w-[760px] object-contain object-right [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.18)_18%,black_46%,black_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.18)_18%,black_46%,black_100%)]"
                loading="eager"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
