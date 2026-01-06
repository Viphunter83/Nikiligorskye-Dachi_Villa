'use client';

/*
 * INSTRUCTIONS FOR IMAGES:
 * Please place the following images in your public/photos directory:
 * - /public/photos/facade.jpg
 * - /public/photos/living.jpg
 * - /public/photos/cinema.jpg
 *
 * If these strictly named files are not found, Next.js Image might throw an error or show alt text.
 * Ensure the directory 'public/photos' exists.
 */

import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, MotionValue, useSpring } from 'framer-motion';
import { usePersona } from '@/lib/store/use-persona';
import { PersonaType, Language } from '@/data/house-data';

// --- DATA STRUCTURE ---

type BilingualText = Record<Language, string>;

interface ScrollyScene {
    id: string;
    imageSrc: string;
    content: Record<PersonaType, BilingualText>;
}

const SCENES: ScrollyScene[] = [
    {
        id: 'scene-1',
        imageSrc: '/photos/facade.jpg',
        content: {
            Target_Family: {
                ru: "Безопасный двор и терраса для семейных завтраков.",
                en: "Safe yard and terrace for family breakfasts."
            },
            Target_Investor: {
                ru: "Монументальный фасад. Кирпич ручной формовки.",
                en: "Monumental facade. Hand-molded brick."
            },
            Target_Party: {
                ru: "Патио для вечеринок на свежем воздухе.",
                en: "Outdoor party patio."
            }
        }
    },
    {
        id: 'scene-2',
        imageSrc: '/photos/living.jpg',
        content: {
            Target_Family: {
                ru: "Просторная гостиная, где соберется вся семья.",
                en: "Spacious living room for the whole family."
            },
            Target_Investor: {
                ru: "Второй свет повышает ликвидность объекта.",
                en: "Second light increases property liquidity."
            },
            Target_Party: {
                ru: "Атриум высотой 7 метров — вау-эффект для гостей.",
                en: "7-meter atrium — a wow effect for guests."
            }
        }
    },
    {
        id: 'scene-3',
        imageSrc: '/photos/cinema.jpg',
        content: {
            Target_Family: {
                ru: "Игровая зона, где дети могут шуметь.",
                en: "Play zone where kids can be loud."
            },
            Target_Investor: {
                ru: "Полноценный развлекательный комплекс в цоколе.",
                en: "Full entertainment complex in the basement."
            },
            Target_Party: {
                ru: "Приватный кинозал и лаунж-зона.",
                en: "Private cinema and lounge zone."
            }
        }
    }
];

export const VisualScrollytelling = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // Smooth scroll progress
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

    const totalScenes = SCENES.length;

    // Derived values for determining active scene
    // We map scroll progress (0 to 1) to scene index (0 to totalScenes - 1)

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-black">

            {/* Sticky Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Images Layer */}
                {SCENES.map((scene, index) => (
                    <SceneImage
                        key={scene.id}
                        scene={scene}
                        index={index}
                        totalScenes={totalScenes}
                        progress={smoothProgress}
                    />
                ))}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Text Content Layer - Positioned Bottom Left */}
                <div className="absolute bottom-20 left-4 md:left-20 z-20 w-full max-w-xl px-4">
                    <SceneContent
                        scenes={SCENES}
                        totalScenes={totalScenes}
                        progress={smoothProgress}
                    />
                </div>
            </div>

        </section>
    );
};

// --- SUB-COMPONENTS for cleaner rendering ---

const SceneImage = ({
    scene,
    index,
    totalScenes,
    progress
}: {
    scene: ScrollyScene;
    index: number;
    totalScenes: number;
    progress: MotionValue<number>;
}) => {
    // Calculate opacity based on scroll position
    // Scene 0: visible 0-0.33
    // Scene 1: visible 0.33-0.66
    // Scene 2: visible 0.66-1.0

    const step = 1 / totalScenes;
    const start = index * step;
    const end = start + step;

    // Create a small overlap or distinct transition
    const opacity = useTransform(
        progress,
        [start, start + step * 0.2, end - step * 0.2, end],
        [0, 1, 1, 0]
    );

    // Special case for first and last to ensure full visibility at start/end if needed
    // But specific mapping is safer for distinct scenes

    // We can also use a z-index approach or just letting opacity handle it.
    // If we want crossfades, we need overlapping ranges.

    // Improved Logic:
    // Scene 0: 0 -> 0.33 (Fade out at end)
    // Scene 1: 0.33 (Fade in) -> 0.66 (Fade out)
    // Scene 2: 0.66 (Fade in) -> 1

    const fadeStart = index * step;
    const fadeEnd = (index + 1) * step;

    // For the very first image, we want it visible initially.
    // For the very last image, we want it to stay visible until end.

    const computedOpacity = useTransform(progress, (val) => {
        // Crossfade logic
        // Active Range: [index/total, (index+1)/total]
        // We add a little buffer for crossfading
        const fadeBuffer = 0.05;

        if (index === 0) {
            return val < (step + fadeBuffer) ? 1 : 0;
        }

        const enterStart = fadeStart - fadeBuffer;
        const enterEnd = fadeStart + fadeBuffer;
        const exitStart = fadeEnd - fadeBuffer;
        const exitEnd = fadeEnd + fadeBuffer;

        if (val < enterStart) return 0;
        if (val >= enterStart && val < enterEnd) {
            // Fading in
            return (val - enterStart) / (2 * fadeBuffer);
        }
        if (val >= enterEnd && val < exitStart) return 1;
        if (val >= exitStart && val < exitEnd) {
            // Fading out
            return 1 - (val - exitStart) / (2 * fadeBuffer);
        }
        return 0;
    });

    return (
        <motion.div
            style={{ opacity: computedOpacity }}
            className="absolute inset-0 w-full h-full"
        >
            {/* Using standard img for now as requested, could be Next/Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={scene.imageSrc}
                alt={scene.id}
                className="w-full h-full object-cover"
            />
        </motion.div>
    );
};

const SceneContent = ({
    scenes,
    totalScenes,
    progress
}: {
    scenes: ScrollyScene[];
    totalScenes: number;
    progress: MotionValue<number>;
}) => {
    const { activePersona, language } = usePersona();
    const step = 1 / totalScenes;

    // Determine current active index based on progress value for React render key
    // We hook into the change of progress to set state isn't ideal for 'useTransform', 
    // but for text switching we need a distinct value.
    // However, we can just use Motion's useTransform to conditionally render opacity of stacked cards.

    return (
        <div className="relative w-full">
            {scenes.map((scene, index) => {
                const fadeStart = index * step;
                const fadeEnd = (index + 1) * step;

                // Text fade logic
                // Visible strictly within its sector
                const opacity = useTransform(
                    progress,
                    [fadeStart, fadeStart + 0.1, fadeEnd - 0.1, fadeEnd],
                    [0, 1, 1, 0]
                );

                const y = useTransform(
                    progress,
                    [fadeStart, fadeStart + 0.1, fadeEnd - 0.1, fadeEnd],
                    [20, 0, 0, -20]
                );

                // Check if this card is effectively active for pointer events etc (optional)

                return (
                    <motion.div
                        key={scene.id}
                        style={{ opacity, y, pointerEvents: "none" }} // pointer-events none to let scroll happen
                        className="absolute bottom-0 left-0 w-full"
                    >
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-2xl">
                            <div className="text-primary text-xs uppercase tracking-widest font-bold mb-2">
                                {activePersona.replace('Target_', '')} Perspective
                            </div>
                            <p className="text-xl md:text-3xl text-white font-serif leading-tight">
                                {scene.content[activePersona][language]}
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};
