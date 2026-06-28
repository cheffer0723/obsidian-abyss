import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Hero from './components/Hero';
import CardGrid from './components/CardGrid';
import StatsSection from './components/StatsSection';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-black overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <CardGrid />
        <StatsSection />
        <PricingSection />
        <Footer />
      </div>
    </main>
  );
}
