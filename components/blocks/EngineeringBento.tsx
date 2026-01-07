'use client';

import { motion } from 'framer-motion';
import { Flame, Zap, Droplets, Wifi, Server, ShieldCheck } from 'lucide-react';
import { usePersona } from '@/lib/store/use-persona';
import { ReactNode } from 'react';
import Image from 'next/image';

// Reusable Glass Card
const GlassCard = ({
    children,
    className = "",
    highlight = false,
    image
}: {
    children: ReactNode;
    className?: string;
    highlight?: boolean;
    image?: string;
}) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className={`relative overflow-hidden rounded-2xl border p-8 transition-all duration-300
            ${highlight
                ? 'bg-[#D4AF37]/10 border-[#D4AF37]/40 shadow-[0_0_30px_rgba(212,175,55,0.1)]'
                : 'bg-zinc-900/40 border-white/10 hover:border-white/20 hover:bg-zinc-900/60 shadow-lg'
            } ${className}`}
    >
        {/* Background Image */}
        {image && (
            <>
                <Image
                    src={image}
                    alt=""
                    fill
                    className="object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
            </>
        )}

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
            image: '/photos/bento_heating.png'
        },
        {
            id: 'dynamic',
            colSpan: 'md:col-span-1',
            highlight: true,
            title: engineeringFocus?.Title?.[language],
            icon: ShieldCheck,
            text: engineeringFocus?.Text?.[language],
            // Dynamic card keeps emphasis style without image for contrast
        },
        {
            id: 'health',
            colSpan: 'md:col-span-1',
            title: 'H2O & Air',
            icon: Droplets,
            text: language === 'ru'
                ? '5-ступенчатая водоочистка + Приточная вентиляция.'
                : '5-stage water purification + Fresh air supply.',
            image: '/photos/bento_water.png'
        },
        {
            id: 'connectivity',
            colSpan: 'md:col-span-1',
            title: language === 'ru' ? 'Цифровая магистраль' : 'Digital Highway',
            icon: Wifi,
            text: language === 'ru'
                ? 'Оптический канал связи. Бесшовный Wi-Fi на участке и в доме.'
                : 'Optical fiber channel. Seamless Wi-Fi indoors and outdoors.',
            image: '/photos/bento_tech.png'
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
                                image={card.image}
                            >
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div className="mb-6">
                                        <div className={`p-3 rounded-lg inline-flex mb-4 ${card.highlight ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-white/10 text-white'}`}>
                                            <card.icon size={24} />
                                        </div>
                                        <h4 className="text-xl font-semibold mb-2">{card.title}</h4>
                                        <p className="text-white/80 leading-relaxed font-light">
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
