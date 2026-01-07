"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePersona } from "@/lib/store/use-persona";
import Image from "next/image";

const UI_TEXT = {
    en: {
        title: "Architectural Scanner",
        subtitle: "Compare Legal vs Real Area",
        legal: "Blueprint",
        legalDesc: "Legal Area",
        real: "Reality",
        realDesc: "Total Usage Area",
        diff: "Difference",
        diffValue: "+240 m²",
        levels: {
            basement: "Basement",
            floor1: "1st Floor",
            floor2: "2nd Floor",
        }
    },
    ru: {
        title: "Архитектурный Сканер",
        subtitle: "Сравните Юридическую и Реальную Площадь",
        legal: "По документам",
        legalDesc: "Юридическая площадь",
        real: "Фактически",
        realDesc: "Общая полезная площадь",
        diff: "Разница",
        diffValue: "+240 м²",
        levels: {
            basement: "Цоколь",
            floor1: "1 Этаж",
            floor2: "2 Этаж",
        }
    },
};

type LevelType = 'basement' | 'floor1' | 'floor2';

interface LevelData {
    id: LevelType;
    blueprint: string;
    reality: string;
    labels: { id: string; x: number; y: number; textRigth?: boolean }[];
}

const LEVEL_DATA: Record<LevelType, LevelData> = {
    basement: {
        id: 'basement',
        blueprint: '/assets/plans/basement_blueprint.png',
        reality: '/assets/plans/basement_reality.png',
        labels: [
            { id: 'spa', x: 20, y: 40 },
            { id: 'cinema', x: 60, y: 30 },
            { id: 'wine', x: 80, y: 60, textRigth: true },
        ]
    },
    floor1: {
        id: 'floor1',
        blueprint: '/assets/plans/floor1_blueprint.png',
        reality: '/assets/plans/floor1_reality.png',
        labels: [
            { id: 'garage', x: 15, y: 65 },
            { id: 'kitchen', x: 45, y: 30 },
            { id: 'pool', x: 75, y: 50, textRigth: true },
        ]
    },
    floor2: {
        id: 'floor2',
        blueprint: '/assets/plans/floor2_blueprint.png',
        reality: '/assets/plans/floor2_reality.png',
        labels: [
            { id: 'master', x: 30, y: 40 },
            { id: 'kids', x: 60, y: 30 },
            { id: 'office', x: 70, y: 60, textRigth: true },
        ]
    },
};

const AREA_LABELS = {
    en: {
        spa: "SPA Zone",
        cinema: "Home Cinema",
        wine: "Wine Cellar",
        garage: "Garage (2 cars)",
        kitchen: "Kitchen & Dining",
        pool: "Swimming Pool",
        master: "Master Suite",
        kids: "Children's Room",
        office: "Private Office",
    },
    ru: {
        spa: "SPA Зона",
        cinema: "Домашний Кинотеатр",
        wine: "Винный Погреб",
        garage: "Гараж (2 авто)",
        kitchen: "Кухня-Столовая",
        pool: "Бассейн",
        master: "Мастер-спальня",
        kids: "Детская",
        office: "Кабинет",
    }
};

interface ScannerFrameProps {
    activeLevel: LevelType;
    currentLevel: LevelData;
    t: typeof UI_TEXT.en;
    areaLabels: typeof AREA_LABELS.en;
}

const ScannerFrame = ({ activeLevel, currentLevel, t, areaLabels }: ScannerFrameProps) => {
    const [sliderValue, setSliderValue] = useState(50);
    const showRealityLabels = sliderValue > 30;

    return (
        <div className="relative max-w-5xl mx-auto aspect-[16/9] md:aspect-[2/1] bg-surface-800/30 rounded-2xl border border-white/5 overflow-hidden shadow-2xl backdrop-blur-sm group">

            {/* Layer 1: Blueprint (Legal Area) */}
            <div className="absolute inset-0 p-[5%] flex items-center justify-center pointer-events-none select-none">
                <div className="relative w-full h-full">
                    <Image
                        src={currentLevel.blueprint}
                        alt="Blueprint"
                        fill
                        sizes="(max-width: 768px) 100vw, 80vw"
                        className="object-contain opacity-60 mix-blend-screen filter drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                    />
                </div>
            </div>

            {/* Layer 2: Reality (Total Area) - Masked */}
            <motion.div
                className="absolute inset-0 p-[5%] flex items-center justify-center pointer-events-none select-none"
                style={{
                    clipPath: `polygon(0 0, ${sliderValue * 1.5}% 0, ${sliderValue * 0.8}% 100%, 0% 100%)`,
                    willChange: "clip-path"
                }}
            >
                <div className="relative w-full h-full">
                    <Image
                        src={currentLevel.reality}
                        alt="Reality 3D Render"
                        fill
                        sizes="(max-width: 768px) 100vw, 80vw"
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Reality Gradient Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent mix-blend-overlay pointer-events-none"></div>
            </motion.div>

            {/* Scanner Line */}
            <div
                className="absolute top-[-10%] bottom-[-10%] w-[2px] bg-primary-400 z-30 pointer-events-none"
                style={{
                    left: `${sliderValue}%`,
                    transform: `rotate(12deg) translateX(-50%)`,
                    boxShadow: '0 0 15px 2px rgba(212, 175, 55, 0.8), 0 0 30px 5px rgba(212, 175, 55, 0.3)',
                    willChange: "left"
                }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="absolute top-0 bottom-0 w-[40px] -left-[20px] bg-gradient-to-r from-primary-500/0 via-primary-500/20 to-primary-500/0 blur-md"></div>
            </div>

            {/* Interactive Slider Area */}
            <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
                aria-label="Compare Legal vs Real Area"
            />

            {/* Floating Labels (Dynamic based on level) */}
            <AnimatePresence>
                {showRealityLabels && currentLevel.labels.map((label) => (
                    <motion.div
                        key={`${activeLevel}-${label.id}`}
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="absolute z-30 pointer-events-none"
                        style={{
                            left: `${label.x}%`,
                            top: `${label.y}%`
                        }}
                    >
                        <div className={`
                        flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-primary-500/30 text-xs text-white shadow-xl
                        ${label.textRigth ? 'flex-row-reverse' : ''}
                     `}>
                            <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-[pulse_2s_infinite]"></div>
                            <span className="font-medium tracking-wide whitespace-nowrap text-primary-100">
                                {areaLabels[label.id as keyof typeof areaLabels]}
                            </span>
                        </div>
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-1/2 w-0.5 h-8 bg-gradient-to-b from-primary-500/50 to-transparent -translate-x-1/2 translate-y-2"></div>
                    </motion.div>
                ))}
            </AnimatePresence>


            {/* Comparative Metrics Panel - Floating on bottom */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
                <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 text-left">
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{t.legal}</p>
                    <div className="text-2xl font-playfair text-white">506 m²</div>
                    <p className="text-white/40 text-[10px]">{t.legalDesc}</p>
                </div>

                {/* Animated Difference Indicator */}
                {/* Animated Difference Indicator */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: sliderValue > 60 ? 1 : 0, scale: sliderValue > 60 ? 1 : 0.8 }}
                    className="mb-4 px-4 py-2 font-bold rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.4)] z-50"
                    style={{ backgroundColor: '#D4AF37', color: 'black' }}
                >
                    {t.diffValue}
                </motion.div>

                <div className="bg-primary-950/80 backdrop-blur-md p-4 rounded-xl border border-primary-500/30 text-right">
                    <p className="text-primary-200/60 text-xs uppercase tracking-wider mb-1">{t.real}</p>
                    <div className="text-2xl font-playfair text-primary-400">746 m²</div>
                    <p className="text-primary-200/40 text-[10px]">{t.realDesc}</p>
                </div>
            </div>

            {/* Caption */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-8 text-[10px] text-white/30 font-mono uppercase tracking-widest pointer-events-none">
                <span className={sliderValue < 50 ? "text-primary-400" : ""}>01. {t.legal}</span>
                <span className="w-px h-3 bg-white/10"></span>
                <span className={sliderValue > 50 ? "text-primary-400" : ""}>02. {t.real}</span>
            </div>

        </div>
    );
};

export const AreaComparator = () => {
    const [activeLevel, setActiveLevel] = useState<LevelType>('floor1');
    const { language } = usePersona();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Default to 'ru' (server default) until mounted
    const displayLanguage = mounted ? language : 'ru';

    const t = UI_TEXT[displayLanguage as keyof typeof UI_TEXT] || UI_TEXT.en;
    const areaLabels = AREA_LABELS[displayLanguage as keyof typeof AREA_LABELS] || AREA_LABELS.en;

    const currentLevel = LEVEL_DATA[activeLevel];

    return (
        <section className="relative py-24 bg-surface-900 overflow-hidden">
            {/* Background Atmosphere - Now Static! */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900 to-surface-950 opacity-80"></div>
                {/* Architectural Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"></div>
            </div>

            <div className="container relative z-10 mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-playfair text-white mb-4"
                    >
                        {t.title}
                    </motion.h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                </div>

                {/* Level Switcher */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex bg-surface-800/50 backdrop-blur-md rounded-full p-1 border border-white/10">
                        {(['basement', 'floor1', 'floor2'] as LevelType[]).map((level) => (
                            <button
                                key={level}
                                onClick={() => setActiveLevel(level)}
                                className={`
                  px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${activeLevel === level
                                        ? 'bg-primary-500 text-white shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'}
                `}
                            >
                                {t.levels[level]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scanner Component - Isolated State */}
                <ScannerFrame
                    activeLevel={activeLevel}
                    currentLevel={currentLevel}
                    t={t}
                    areaLabels={areaLabels}
                />

            </div>
        </section>
    );
};
