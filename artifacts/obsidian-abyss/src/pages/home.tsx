import { Hero } from "@/components/sections/hero";
import { Modules } from "@/components/sections/modules";
import { Stats } from "@/components/sections/stats";
import { Pricing } from "@/components/sections/pricing";
import { Footer } from "@/components/sections/footer";

export function Home() {
  return (
    <main className="bg-[#010309] min-h-screen text-white">
      <Hero />
      <Modules />
      <Stats />
      <Pricing />
      <Footer />
    </main>
  );
}
