'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePersona } from '@/lib/store/use-persona';
import { PersonaToggle } from '../ui/PersonaToggle';
import { PersonaType, Language, HOUSE_DATA } from '@/data/house-data';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
    overrideHeadline?: string;
    overrideSubheadline?: string;
    heroImage?: string;
    overlayOpacity?: number;
}

export const HeroSection = ({
    overrideHeadline,
    overrideSubheadline,
    heroImage: cmsHeroImage,
    overlayOpacity = 40
}: HeroSectionProps = {}) => {
    const { activePersona, getCurrentContent, language } = usePersona();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Ensure hydration match by using default on first render
    const displayPersona = mounted ? activePersona : 'Target_Family';
    const content = HOUSE_DATA.Content[displayPersona];
    const heroImage = cmsHeroImage || content.HeroImage || '/Living.jpeg'; // CMS > Data > Fallback

    // Scrim gradients for readability
    const scrims: Record<PersonaType, string> = {
        Target_Family: 'bg-gradient-to-t from-black/80 via-black/20 to-black/30 mix-blend-multiply', // Warm/Cozy
        Target_Investor: 'bg-gradient-to-t from-black/90 via-slate-900/40 to-black/40', // Cold/Serious
        Target_Party: 'bg-gradient-to-t from-purple-900/80 via-black/40 to-black/60', // Vibrant/Dark
    };

    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">
            {/* Navigation */}
            <nav className="absolute top-0 w-full z-50 p-8 flex justify-between items-center max-w-[1800px] mx-auto">
                <Link
                    href="/journal"
                    className="text-xs font-medium tracking-[0.2em] text-white/50 hover:text-[#D4AF37] transition-colors uppercase border border-white/10 px-4 py-2 rounded-full hover:bg-white/5"
                >
                    Journal
                </Link>

                <div className="flex items-center gap-6 mr-28">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase mb-0.5">
                            {language === 'ru' ? 'Закрытая продажа' : 'Private Sale'}
                        </span>
                        <a href="tel:+79999999999" className="text-sm font-medium text-white tracking-wider hover:text-[#D4AF37] transition-colors">
                            +7 (999) 000-00-00
                        </a>
                    </div>
                    <div className="w-px h-8 bg-white/20 hidden md:block"></div>
                    <div className="px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase">
                        Lot #42
                    </div>
                </div>
            </nav>

            {/* Background Image Layer */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={displayPersona}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={heroImage}
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Ken Burns Effect Layer - Slow Zoom */}
                    <div className="absolute inset-0 bg-black/0 animate-ken-burns" />
                </motion.div>
            </AnimatePresence>

            {/* Scrim/Overlay Layer */}
            {/* Scrim/Overlay Layer */}
            <div
                className={`absolute inset-0 z-1 transition-colors duration-1000 ${scrims[displayPersona]}`}
                style={{ opacity: overlayOpacity / 100 }}
            />

            {/* Grain/Noise Overlay */}
            <div className="absolute inset-0 z-2 opacity-20 bg-[url('/noise.png')] mix-blend-overlay pointer-events-none" />

            <div className="z-10 flex flex-col items-center w-full max-w-4xl px-4 text-center mt-20">

                {/* Persona Toggle */}
                <div className="mb-12">
                    <PersonaToggle />
                </div>

                {/* Dynamic Content */}
                <div className="min-h-[300px] flex flex-col items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${displayPersona}-${language}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="flex flex-col items-center"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                                {overrideHeadline || content.Headline?.[language as Language]}
                            </h1>
                            <p className="text-lg md:text-xl text-white/90 max-w-2xl font-light mb-8 drop-shadow-md">
                                {overrideSubheadline || content.Subheadline?.[language as Language]}
                            </p>

                            {content.CallToAction && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        document.getElementById('alfred-concierge')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="px-8 py-3 bg-primary text-black font-semibold rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all"
                                >
                                    {content.CallToAction[language as Language]}
                                </motion.button>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
