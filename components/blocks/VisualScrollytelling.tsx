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

import { useRef, useMemo, useState, useEffect } from 'react';
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
        imageSrc: '/facade5.jpeg',
        content: {
            Target_Family: {
                ru: "Ваша крепость в сосновом лесу. Закрытая территория поселка, круглосуточная охрана и видеонаблюдение по периметру участка обеспечивают полную безопасность для игр детей на свежем воздухе.",
                en: "Your fortress in a pine forest. Closed territory, 24/7 security, and perimeter surveillance ensure complete safety for children playing outdoors."
            },
            Target_Investor: {
                ru: "Архитектура вне времени. Кирпич ручной формовки и натуральная медь — материалы, которые с годами только дорожают, увеличивая капитализацию объекта.",
                en: "Timeless architecture. Hand-molded brick and natural copper — materials that appreciate over time, increasing the asset's capitalization."
            },
            Target_Party: {
                ru: "Идеальная площадка для open-air ивентов. Просторное патио перед домом, ландшафтная подсветка и отсутствие плотной застройки рядом для максимальной приватности.",
                en: "The ideal venue for open-air events. Spacious patio, landscape lighting, and no dense neighbors for maximum privacy."
            }
        }
    },
    {
        id: 'scene-2',
        imageSrc: '/living.jpeg',
        content: {
            Target_Family: {
                ru: "Сердце дома — гостиная со вторым светом (7м). Здесь достаточно воздуха для семейных праздников, а панорамные окна стирают границу с природой, наполняя дом светом.",
                en: "The heart of the home — a living room with 7m ceilings. Enough air for family celebrations, while panoramic windows blur the line with nature, filling the house with light."
            },
            Target_Investor: {
                ru: "Правильная планировка = Ликвидность. Второй свет и панорамное остекление — ключевые факторы, повышающие оценочную стоимость метра в премиум-сегменте.",
                en: "Correct layout = Liquidity. Second light and panoramic glazing are key factors increasing the valuation per meter in the premium segment."
            },
            Target_Party: {
                ru: "Атриум, который впечатляет. Высота потолков 7 метров создает вау-эффект, а акустика помещения идеально подходит для живой музыки и качественного звука.",
                en: "An atrium that impresses. 7-meter ceilings create a wow effect, and the acoustics are perfect for live music and high-quality sound."
            }
        }
    },
    {
        id: 'scene-3',
        imageSrc: '/cinema1.jpeg',
        content: {
            Target_Family: {
                ru: "Развлечения для всех возрастов. Пока родители отдыхают в SPA-зоне, дети могут смотреть мультфильмы в собственном кинотеатре или играть в безопасной игровой зоне.",
                en: "Entertainment for all ages. While parents relax in the SPA zone, kids can watch cartoons in their own cinema or play in the safe play zone."
            },
            Target_Investor: {
                ru: "Цоколь, который работает. Полноценный развлекательный комплекс увеличивает полезную площадь и функционал дома, делая его уникальным предложением на рынке.",
                en: "A basement that works. A full entertainment complex increases usable area and functionality, making it a unique market offer."
            },
            Target_Party: {
                ru: "Ваш частный ночной клуб. Профессиональный кинозал легко трансформируется в зал для караоке или видеоигр. Шумоизоляция позволяет веселиться до утра.",
                en: "Your private night club. The professional cinema easily transforms into a karaoke or video game hall. Soundproofing lets you party until dawn."
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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const displayPersona = mounted ? activePersona : 'Target_Family';
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
                                {displayPersona.replace('Target_', '')} Perspective
                            </div>
                            <p className="text-xl md:text-3xl text-white font-serif leading-tight">
                                {scene.content[displayPersona][language]}
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};
