import { motion } from "framer-motion";
import { Compass, Activity, GitBranch, Shield, LineChart, Key } from "lucide-react";
import { DecodeText } from "../ui/decode-text";

const modules = [
  {
    id: "charon",
    name: "Charon",
    essence: "Guide",
    desc: "Your guide through the unknown. Unbiased research framing, separating pure signal from systemic noise.",
    icon: Compass
  },
  {
    id: "cerberus",
    name: "Cerberus",
    essence: "Detection",
    desc: "Three-headed market regime detector. Live signals across Bull, Bear, and Sideways states. Fires only when all heads align.",
    icon: Activity
  },
  {
    id: "flow",
    name: "Flow",
    essence: "Process",
    desc: "The brutal methodology: Ask → Read → Test → Decide. You own every decision, backed by mathematical certainty.",
    icon: GitBranch
  },
  {
    id: "non-custodial",
    name: "Non-Custodial",
    essence: "Autonomy",
    desc: "Your keys, your capital. Zero counterparty risk, full sovereignty. We provide the map, you drive the vehicle.",
    icon: Shield
  },
  {
    id: "backtest",
    name: "Backtest",
    essence: "Validation",
    desc: "~20 years of real data. Walk-forward validation, no cherry-picking, no survivorship bias. We show the losses as honestly as the wins.",
    icon: LineChart
  },
  {
    id: "access",
    name: "Access",
    essence: "Entry",
    desc: "$9.99/month. Everything included. No hidden tiers. No VIP groups. Just raw, unfiltered access to the truth.",
    icon: Key
  }
];

export function Modules() {
  return (
    <section id="platform" className="scroll-mt-24 py-32 bg-[#020A19] relative z-10">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            <DecodeText text="THE ARSENAL" />
          </h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-primary/50 to-transparent max-w-3xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative border border-white/10 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-all overflow-hidden"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,255,0.1),transparent_70%)]" />
              
              <div className="flex justify-between items-start mb-8">
                <mod.icon className="w-8 h-8 text-primary opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono">
                  {String(i + 1).padStart(2, '0')} // {mod.essence}
                </span>
              </div>
              
              <h3 className="text-2xl font-display font-bold text-white mb-4 tracking-wide group-hover:text-primary transition-colors">
                {mod.name}
              </h3>
              
              <p className="text-white/60 text-sm leading-relaxed">
                {mod.desc}
              </p>

              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-2 h-[1px] bg-primary/50" />
              <div className="absolute top-0 left-0 w-[1px] h-2 bg-primary/50" />
              <div className="absolute bottom-0 right-0 w-2 h-[1px] bg-primary/50" />
              <div className="absolute bottom-0 right-0 w-[1px] h-2 bg-primary/50" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
