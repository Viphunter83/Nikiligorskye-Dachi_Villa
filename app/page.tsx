import { getHouseProfile } from '@/lib/actions';
import { HeroSection } from '@/components/blocks/HeroSection';
import { AreaComparator } from '@/components/blocks/AreaComparator';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { EngineeringBento } from '@/components/blocks/EngineeringBento';
import { FeaturesGrid } from '@/components/blocks/FeaturesGrid';
import { VisualScrollytelling } from '@/components/blocks/VisualScrollytelling';
import { LocationMap } from '@/components/blocks/LocationMap';
import { AlfredConcierge } from '@/components/blocks/AlfredConcierge';

export default async function Home() {
  const house = await getHouseProfile();

  if (!house) return <div className="text-white text-center py-20">Loading...</div>

  // Safely access JSON
  const cmsData = house.cms_data as any || {};

  // Ignore default placeholder to allow persona images to show
  const isDefaultHero = house.hero_image_url === '/hero-bg.jpg';
  const heroImageOverride = isDefaultHero ? undefined : house.hero_image_url;

  return (
    <main className="bg-[#0a0a0a]">
      <LanguageToggle />
      <HeroSection
        heroImage={heroImageOverride}
        overlayOpacity={house.hero_overlay_opacity}
        overrideHeadline={house.headline_family} // Default to family, logic inside handles overrides
      />

      <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto"></div>
      <AreaComparator />

      <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto"></div>
      <EngineeringBento photos={cmsData.engineering} />

      <FeaturesGrid />

      {/* VisualScrollytelling could also be genericized later */}
      <VisualScrollytelling />

      <LocationMap />

      <AlfredConcierge background={cmsData.concierge} />

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
