'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePersona } from '@/lib/store/use-persona';
import { PersonaToggle } from '../ui/PersonaToggle';
import { PersonaType, Language } from '@/data/house-data';

const gradients: Record<PersonaType, string> = {
    Target_Family: 'bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]', // Warm/Safe (Deep Blue/Indigo)
    Target_Investor: 'bg-gradient-to-br from-[#0c0a09] via-[#1c1917] to-[#292524]', // Serious/Solid (Stone/Dark Grey)
    Target_Party: 'bg-gradient-to-br from-[#270b1b] via-[#4a044e] to-[#0f0727]', // Vibrant/Night (Deep Purple)
};

export const HeroSection = () => {
    const { activePersona, getCurrentContent, language } = usePersona();
    const content = getCurrentContent();

    return (
        <section className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden transition-colors duration-1000 ${gradients[activePersona]}`}>

            {/* Background elements (noise, overlay) could go here */}
            <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay pointer-events-none"></div>

            <div className="z-10 flex flex-col items-center w-full max-w-4xl px-4 text-center">

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
                            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70 mb-6 leading-tight">
                                {content.Headline?.[language as Language]}
                            </h1>
                            <p className="text-lg md:text-xl text-white/80 max-w-2xl font-light mb-8">
                                {content.Subheadline?.[language as Language]}
                            </p>

                            {content.CallToAction && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
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
