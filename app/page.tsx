import { HeroSection } from '@/components/blocks/HeroSection';
import { AreaComparator } from '@/components/blocks/AreaComparator';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { EngineeringBento } from '@/components/blocks/EngineeringBento';
import { FeaturesGrid } from '@/components/blocks/FeaturesGrid';
import { VisualScrollytelling } from '@/components/blocks/VisualScrollytelling';
import { LocationMap } from '@/components/blocks/LocationMap';
import { AlfredConcierge } from '@/components/blocks/AlfredConcierge';

export default function Home() {
  return (
    <main className="bg-[#0a0a0a]">
      <LanguageToggle />
      <HeroSection />

      <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto"></div>
      <AreaComparator />

      <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto"></div>
      <EngineeringBento />

      <FeaturesGrid />

      <VisualScrollytelling />

      <LocationMap />

      <AlfredConcierge />

      {/* Simple Footer */}
      <footer className="w-full py-8 text-center text-white/30 text-xs border-t border-white/5">
        <p>© 2026 Nikologorskie Dachi Residence. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-primary cursor-pointer transition-colors">Legal</span>
        </div>
      </footer>
    </main>
  );
}
