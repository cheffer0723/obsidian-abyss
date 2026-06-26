import { Hero } from "@/components/sections/hero";
import { LiveEngine } from "@/components/sections/live-engine";
import { Backtest } from "@/components/sections/backtest";
import { PlatformCards } from "@/components/sections/platform-cards";
import { Modules } from "@/components/sections/modules";
import { Stats } from "@/components/sections/stats";
import { MiroFish } from "@/components/sections/mirofish";
import { Agents } from "@/components/sections/agents";
import { Pricing } from "@/components/sections/pricing";
import { Footer } from "@/components/sections/footer";

export function Home() {
  return (
    <main className="bg-[#010309] min-h-screen text-white">
      <Hero />
      <LiveEngine />
      <Backtest />
      <PlatformCards />
      <Modules />
      <Stats />
      <MiroFish />
      <Agents />
      <Pricing />
      <Footer />
    </main>
  );
}
