import { HeroSection } from '@/components/blocks/HeroSection';
import { AreaComparator } from '@/components/blocks/AreaComparator';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { EngineeringBento } from '@/components/blocks/EngineeringBento';

export default function Home() {
  return (
    <main className="bg-[#0a0a0a]">
      <LanguageToggle />
      <HeroSection />
      <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto"></div>
      <AreaComparator />
      <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto"></div>
      <EngineeringBento />
    </main>
  );
}
