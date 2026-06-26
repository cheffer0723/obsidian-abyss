import { motion } from "framer-motion";
import {
  LineChart,
  Route,
  Workflow,
  Boxes,
  FlaskConical,
  Network,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { DecodeText } from "../ui/decode-text";

interface CardCta {
  label: string;
  href: string;
}

interface PlatformCard {
  id: string;
  eyebrow: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  cta: CardCta;
}

const proof: PlatformCard = {
  id: "proof-card",
  eyebrow: "Interactive Backtesting",
  title: "Live Proof",
  desc: "An interactive desk: switch engine and market, watch the equity curve move against buy & hold. ~20 years, net of fees, drawdowns shown — no cherry-picked windows.",
  icon: LineChart,
  cta: { label: "Explore the backtest", href: "#proof" },
};

const platform: PlatformCard[] = [
  {
    id: "cerberus",
    eyebrow: "The Regime Engine",
    title: "Cerberus",
    desc: "Three heads — Orthrus, Hydra, Sisyphus — reading Bull, Bear, or Sideways. It only speaks on consensus, so you act on agreement, not a hunch.",
    icon: Boxes,
    cta: { label: "See the arsenal", href: "#platform" },
  },
  {
    id: "charon",
    eyebrow: "The Advisor",
    title: "Charon",
    desc: "Ferries you across. Suggests which engine and mode fit the current regime — then steps back. The decision stays yours.",
    icon: Route,
    cta: { label: "See the arsenal", href: "#platform" },
  },
  {
    id: "flow",
    eyebrow: "The Method",
    title: "Flow",
    desc: "Ask. Read. Test. Decide. A loop that always ends in your judgment, never ours — built to inform, not to instruct.",
    icon: Workflow,
    cta: { label: "See the arsenal", href: "#platform" },
  },
];

const premium: PlatformCard[] = [
  {
    id: "mirofish",
    eyebrow: "Premium Access",
    title: "MiroFish",
    desc: "The deep-research layer. Bespoke analysis and signals for members who want to go further than the public desk.",
    icon: FlaskConical,
    cta: { label: "Request MiroFish access", href: "mailto:contact@obsidianabyss.com?subject=MiroFish%20Access" },
  },
  {
    id: "x402",
    eyebrow: "Programmatic Access",
    title: "x402",
    desc: "Machine-payable, pay-per-call access to the engines. Wire the abyss into your own systems on a per-request basis.",
    icon: Network,
    cta: { label: "Request x402 access", href: "mailto:contact@obsidianabyss.com?subject=x402%20Access" },
  },
];

function CtaLink({ cta }: { cta: CardCta }) {
  const external = cta.href.startsWith("mailto:");
  return (
    <a
      href={cta.href}
      {...(external ? {} : {})}
      className="group/cta mt-5 inline-flex items-center gap-2 font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-primary/80 hover:text-primary transition-colors"
    >
      {cta.label}
      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-1" />
    </a>
  );
}

function CornerTicks() {
  return (
    <>
      <div className="absolute top-0 left-0 w-2 h-[1px] bg-primary/50" />
      <div className="absolute top-0 left-0 w-[1px] h-2 bg-primary/50" />
      <div className="absolute bottom-0 right-0 w-2 h-[1px] bg-primary/50" />
      <div className="absolute bottom-0 right-0 w-[1px] h-2 bg-primary/50" />
    </>
  );
}

export function PlatformCards() {
  return (
    <section id="stack" className="scroll-mt-24 py-28 md:py-32 bg-[#010309] relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-14 text-center md:text-left">
          <div className="font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-primary/70 mb-4">
            // The Stack
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            <DecodeText text="THE FULL STACK" />
          </h2>
          <p className="text-white/55 text-sm md:text-base leading-relaxed max-w-2xl mx-auto md:mx-0">
            Proof, platform, and premium access — one map of everything the abyss puts in your
            hands. Every layer answers to your judgment, never replaces it.
          </p>
          <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-primary/50 via-[rgba(168,85,247,0.45)] to-transparent max-w-3xl mx-auto md:mx-0" />
        </div>

        {/* Group A — Proof (full-width, left accent) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
          className="relative border border-primary/20 border-l-[3px] border-l-primary bg-primary/[0.06] overflow-hidden mb-6"
        >
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_85%_20%,rgba(0,255,255,0.08),transparent_60%)]" />
          <div className="relative z-10 grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 p-7 md:p-9 items-start">
            <proof.icon className="w-9 h-9 text-primary drop-shadow-[0_0_12px_rgba(0,255,255,0.45)]" />
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">
                {proof.eyebrow}
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-wide mb-3">
                {proof.title}
              </h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-3xl">
                {proof.desc}
              </p>
              <CtaLink cta={proof.cta} />
            </div>
          </div>
        </motion.div>

        {/* Group B — Platform (three outline cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {platform.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative flex flex-col border border-white/10 bg-white/[0.02] p-6 hover:border-primary/50 hover:bg-primary/[0.04] transition-all overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,255,0.08),transparent_70%)]" />
              <c.icon className="w-7 h-7 text-primary/80 group-hover:text-primary transition-colors mb-6" />
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 mb-1">
                {c.eyebrow}
              </div>
              <h3 className="text-xl font-display font-bold text-white tracking-wide mb-3">
                {c.title}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed">{c.desc}</p>
              <CtaLink cta={c.cta} />
              <CornerTicks />
            </motion.div>
          ))}
        </div>

        {/* Group C — Premium (two cards, right accent) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {premium.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative flex flex-col border border-white/10 border-r-[3px] border-r-primary/70 bg-white/[0.02] p-7 hover:bg-primary/[0.04] transition-all overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_90%_50%,rgba(168,85,247,0.1),transparent_70%)]" />
              <div className="flex items-center gap-4 mb-4">
                <c.icon className="w-7 h-7 text-primary/80 group-hover:text-primary transition-colors" />
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30">
                    {c.eyebrow}
                  </div>
                  <h3 className="text-xl font-display font-bold text-white tracking-wide">
                    {c.title}
                  </h3>
                </div>
              </div>
              <p className="text-white/55 text-sm leading-relaxed">{c.desc}</p>
              <CtaLink cta={c.cta} />
              <CornerTicks />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
