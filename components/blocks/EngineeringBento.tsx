'use client';

import { motion } from 'framer-motion';
import { Flame, Zap, Droplets, Wifi, Server, ShieldCheck } from 'lucide-react';
import { usePersona } from '@/lib/store/use-persona';
import { ReactNode } from 'react';

// Reusable Glass Card
const GlassCard = ({
    children,
    className = "",
    highlight = false
}: {
    children: ReactNode;
    className?: string;
    highlight?: boolean;
}) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className={`relative overflow-hidden rounded-2xl border p-8 transition-all duration-300
            ${highlight
                ? 'bg-[#D4AF37]/10 border-[#D4AF37]/40 shadow-[0_0_30px_rgba(212,175,55,0.1)]'
                : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10 shadow-lg'
            } ${className}`}
    >
        {children}
    </motion.div>
);

export const EngineeringBento = () => {
    const { getCurrentContent, language } = usePersona();
    const content = getCurrentContent();
    const engineeringFocus = content.Engineering_Focus;

    const cards = [
        {
            id: 'core',
            colSpan: 'md:col-span-2',
            title: language === 'ru' ? 'Сердце дома' : 'Heart of the Home',
            icon: Flame,
            text: language === 'ru'
                ? 'Котельная Buderus (Германия). Погодозависимая автоматика.'
                : 'Buderus Boiler (Germany). Weather-dependent automation.',
            gradient: 'from-orange-500/20 via-amber-500/10 to-transparent'
        },
        {
            id: 'brain',
            colSpan: 'md:col-span-1',
            title: language === 'ru' ? 'IQ Дома' : 'Home IQ',
            icon: Zap,
            text: language === 'ru'
                ? 'Электрика ABB & Schneider Electric. Стабильность 24/7.'
                : 'ABB & Schneider Electric. 24/7 Stability.',
            gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent'
        },
        {
            id: 'dynamic',
            colSpan: 'md:col-span-1',
            highlight: true,
            title: engineeringFocus?.Title?.[language],
            icon: ShieldCheck, // Placeholder icon, maybe dynamic?
            text: engineeringFocus?.Text?.[language],
        },
        {
            id: 'health',
            colSpan: 'md:col-span-1',
            title: 'H2O & Air',
            icon: Droplets,
            text: language === 'ru'
                ? '5-ступенчатая водоочистка + Приточная вентиляция.'
                : '5-stage water purification + Fresh air supply.',
            gradient: 'from-cyan-500/20 via-teal-500/10 to-transparent'
        },
        {
            id: 'connectivity',
            colSpan: 'md:col-span-1', // Defaulting to 1 to fit grid, can be 2 if row flow permits
            title: language === 'ru' ? 'Цифровая магистраль' : 'Digital Highway',
            icon: Wifi,
            text: language === 'ru'
                ? 'Оптический канал связи. Бесшовный Wi-Fi на участке и в доме.'
                : 'Optical fiber channel. Seamless Wi-Fi indoors and outdoors.',
            gradient: 'from-purple-500/20 via-violet-500/10 to-transparent'
        }
    ];

    return (
        <section className="relative w-full py-24 bg-[#0a0a0a] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Heading */}
                <div className="mb-16 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary text-sm tracking-[0.2em] uppercase font-bold mb-4"
                    >
                        {language === 'ru' ? 'Техническое превосходство' : 'Technical Excellence'}
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-serif"
                    >
                        {language === 'ru' ? 'Фундаментальное качество' : 'Fundamental Quality'}
                    </motion.h3>
                </div>

                {/* Grid */}
                {/* Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.15
                            }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            className={`${card.colSpan} h-full`}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                            }}
                        >
                            <GlassCard
                                className="h-full group"
                                highlight={card.highlight}
                            >
                                {/* Animated Gradient Background */}
                                {card.gradient && (
                                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                )}

                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div className="mb-6">
                                        <div className={`p-3 rounded-lg inline-flex mb-4 ${card.highlight ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-white/10 text-white'}`}>
                                            <card.icon size={24} />
                                        </div>
                                        <h4 className="text-xl font-semibold mb-2">{card.title}</h4>
                                        <p className="text-white/60 leading-relaxed font-light">
                                            {card.text}
                                        </p>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
