'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePersona } from '@/lib/store/use-persona';
import { PersonaToggle } from '../ui/PersonaToggle';
import { PersonaType, Language } from '@/data/house-data';
import Image from 'next/image';
import Link from 'next/link';

export const HeroSection = () => {
    const { activePersona, getCurrentContent, language } = usePersona();
    const content = getCurrentContent();
    const heroImage = content.HeroImage || '/Living.jpeg'; // Fallback

    // Scrim gradients for readability
    const scrims: Record<PersonaType, string> = {
        Target_Family: 'bg-gradient-to-t from-black/80 via-black/20 to-black/30 mix-blend-multiply', // Warm/Cozy
        Target_Investor: 'bg-gradient-to-t from-black/90 via-slate-900/40 to-black/40', // Cold/Serious
        Target_Party: 'bg-gradient-to-t from-purple-900/80 via-black/40 to-black/60', // Vibrant/Dark
    };

    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">
            {/* Navigation */}
            <nav className="absolute top-0 w-full z-50 p-8 flex justify-start max-w-[1800px] mx-auto">
                <Link
                    href="/journal"
                    className="text-sm font-medium tracking-widest text-white/70 hover:text-[#D4AF37] transition-colors uppercase"
                >
                    Journal
                </Link>
            </nav>

            {/* Background Image Layer */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={activePersona}
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
            <div className={`absolute inset-0 z-1 transition-colors duration-1000 ${scrims[activePersona]}`} />

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
                            key={`${activePersona}-${language}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="flex flex-col items-center"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                                {content.Headline?.[language as Language]}
                            </h1>
                            <p className="text-lg md:text-xl text-white/90 max-w-2xl font-light mb-8 drop-shadow-md">
                                {content.Subheadline?.[language as Language]}
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
