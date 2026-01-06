'use client';

import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';
import { usePersona } from '@/lib/store/use-persona';

export const AreaComparator = () => {
    const { getCurrentContent, language } = usePersona();
    const content = getCurrentContent();
    const [sliderValue, setSliderValue] = useState(50);
    const [displayArea, setDisplayArea] = useState(506);

    // Safety check - if content is missing, return null or defaults
    const spaceHackLabel = content.SpaceHack_Label?.[language] || '';
    const spaceHackDesc = content.SpaceHack_Desc?.[language] || '';

    const legalArea = 506;
    const totalArea = 746;

    // Smooth number animation
    useEffect(() => {
        const targetArea = legalArea + (totalArea - legalArea) * (sliderValue / 100);
        const controls = animate(displayArea, targetArea, {
            duration: 0.1,
            onUpdate: (value) => setDisplayArea(Math.round(value)),
        });
        return controls.stop;
    }, [sliderValue]);

    return (
        <section className="relative w-full py-20 bg-[#0a0a0a] overflow-hidden text-white flex flex-col items-center">

            {/* Header Content */}
            <div className="z-10 text-center mb-12 max-w-2xl px-4">
                <motion.h2
                    key={spaceHackLabel}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-primary text-sm tracking-[0.2em] uppercase font-bold mb-2"
                >
                    {spaceHackLabel}
                </motion.h2>
                <motion.p
                    key={spaceHackDesc}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl md:text-3xl font-light text-white/90"
                >
                    {spaceHackDesc}
                </motion.p>
            </div>

            {/* Visualizer Container */}
            <div className="relative w-full max-w-4xl h-[400px] mb-12 flex items-center justify-center">

                {/* Visualizer Frame */}
                <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[400px]">

                    {/* Layer A: Legal Area (Blueprint Style) */}
                    <div className="absolute inset-0 border border-white/20 p-8 flex items-center justify-center opacity-70">
                        <div className="w-[80%] h-[80%] border-2 border-dashed border-blue-400/50 flex items-center justify-center">
                            <span className="text-blue-400/70 font-mono text-sm uppercase">Legal Core</span>
                        </div>
                        {/* Abstract rooms */}
                        <div className="absolute top-4 left-4 w-24 h-24 border border-blue-400/30"></div>
                        <div className="absolute bottom-4 right-4 w-32 h-32 border border-blue-400/30"></div>
                    </div>

                    {/* Layer B: Total Area (Luxury Filled) - Masked */}
                    <motion.div
                        className="absolute inset-0 bg-[#D4AF37]/5 backdrop-blur-sm shadow-[0_0_50px_rgba(212,175,55,0.1)] border border-[#D4AF37]/30"
                        style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
                    >
                        <div className="w-full h-full p-8 flex items-center justify-center">
                            <div className="w-[80%] h-[80%] bg-[#D4AF37]/10 flex items-center justify-center">
                                <span className="text-[#D4AF37] font-serif italic text-lg opacity-80">Extended Luxury</span>
                            </div>
                            {/* Detailed filled areas */}
                            <div className="absolute top-4 left-4 w-24 h-24 bg-[#D4AF37]/20"></div>
                            <div className="absolute bottom-4 right-4 w-32 h-32 bg-[#D4AF37]/20"></div>
                            {/* Extra Terraces highlighting the diff */}
                            <div className="absolute -right-8 top-12 w-16 h-48 bg-[#D4AF37]/20 border-l border-[#D4AF37]/40"></div>
                            <div className="absolute -left-8 bottom-12 w-16 h-32 bg-[#D4AF37]/20 border-r border-[#D4AF37]/40"></div>
                        </div>
                    </motion.div>

                    {/* Slider Handle Line */}
                    <div
                        className="absolute top-0 bottom-0 w-0.5 bg-white z-20 cursor-ew-resize"
                        style={{ left: `${sliderValue}%` }}
                    >
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                            <div className="w-1.5 h-4 bg-gray-400 rounded-full mx-0.5"></div>
                            <div className="w-1.5 h-4 bg-gray-400 rounded-full mx-0.5"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls & Data */}
            <div className="z-10 flex flex-col items-center w-full max-w-xl px-6">

                {/* Range Slider */}
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer mb-8 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                />

                {/* Counter */}
                <div className="flex items-baseline space-x-4">
                    <span className="text-white/50 text-xl font-light">Area</span>
                    <motion.span className="text-6xl md:text-8xl font-thin text-white tabular-nums">
                        {displayArea}
                    </motion.span>
                    <span className="text-primary text-xl font-light">m²</span>
                </div>

                <div className="flex justify-between w-full mt-4 text-sm text-white/40 font-mono uppercase tracking-widest">
                    <span>Legal: {legalArea}</span>
                    <span>Total: {totalArea}</span>
                </div>
            </div>
        </section>
    );
};
