import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { ShieldCheck, Sparkles } from "lucide-react";

const visuals = [
  {
    title: "Secure Operations",
    subtitle: "Continuous monitoring",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Threat Intelligence",
    subtitle: "Signals across your workspace",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Analyst Workspace",
    subtitle: "Decisions with context",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  },
];

export function SecurityVisuals() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = root.querySelectorAll<HTMLElement>("[data-security-card]");
    const badges = root.querySelectorAll<HTMLElement>("[data-security-badge]");

    animate(cards, {
      opacity: [0, 1],
      translateY: [28, 0],
      scale: [0.97, 1],
      delay: stagger(100),
      duration: 700,
      ease: "outCubic",
    });

    animate(badges, {
      translateY: [0, -5],
      duration: 1800,
      delay: stagger(180),
      ease: "inOutSine",
      loop: true,
      alternate: true,
    });
  }, []);

  return (
    <section ref={rootRef} className="space-y-3.5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="mb-1.5 flex items-center gap-2 text-violet">
            <Sparkles className="size-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] font-mono">
              Safe Flow Intelligence
            </span>
          </div>
          <h2 className="text-base font-bold tracking-tight text-foreground">
            Built for calm, fast investigations
          </h2>
        </div>
        <div
          data-security-badge
          className="hidden items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-3 py-1.5 text-[10px] font-semibold text-teal sm:flex"
        >
          <ShieldCheck className="size-3.5" />
          Protection active
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {visuals.map((visual) => (
          <article
            key={visual.title}
            data-security-card
            className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-xs"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={visual.image}
                alt={visual.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-4 bottom-4">
                <p className="text-sm font-bold text-white">{visual.title}</p>
                <p className="mt-0.5 text-[11px] text-white/75">{visual.subtitle}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
