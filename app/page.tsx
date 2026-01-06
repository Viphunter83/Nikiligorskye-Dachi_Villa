import { HeroSection } from '@/components/blocks/HeroSection';
import { AreaComparator } from '@/components/blocks/AreaComparator';

export default function Home() {
  return (
    <main className="bg-[#0a0a0a]">
      <HeroSection />
      <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto"></div>
      <AreaComparator />
    </main>
  );
}
