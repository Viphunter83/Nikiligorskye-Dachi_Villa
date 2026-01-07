'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePersona } from '@/lib/store/use-persona';
import { MapPin, Navigation, Clock, ExternalLink, GraduationCap, ShoppingBag, Utensils, HeartPulse, Dumbbell } from 'lucide-react';
import { useState, useEffect } from 'react';

import { HOUSE_DATA } from '@/data/house-data';

export const LocationMap = () => {
    const { language, activePersona } = usePersona();
    const [activeRoute, setActiveRoute] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const displayPersona = mounted ? activePersona : 'Target_Family';
    const content = HOUSE_DATA.Content[displayPersona];

    const highlights = content.Location_Highlights?.[language];

    const routes = [
        {
            id: 'rublevo',
            name: language === 'ru' ? 'Рублево-Успенское ш.' : 'Rublevo-Uspenskoe Hwy',
            time: '25 min',
            color: '#D4AF37', // Gold
            path: "M 10 350 Q 80 300 150 250 T 300 150",
            link: "https://yandex.ru/maps/?rtext=55.753215,37.622504~55.7417,37.0888&rtt=auto"
        },
        {
            id: 'novoriga',
            name: language === 'ru' ? 'Новорижское ш.' : 'Novorizhskoe Hwy',
            time: '35 min',
            color: '#3B82F6', // Blue
            path: "M 10 100 Q 150 120 300 150",
            link: "https://yandex.ru/maps/?rtext=55.753215,37.622504~55.7417,37.0888&rtt=auto"
        },
        {
            id: 'ilyinskoe',
            name: language === 'ru' ? 'Ильинское ш.' : 'Ilyinskoe Hwy',
            time: '40 min',
            color: '#10B981', // Green
            path: "M 10 250 Q 100 250 200 200 T 300 150",
            link: "https://yandex.ru/maps/?rtext=55.753215,37.622504~55.7417,37.0888&rtt=auto"
        }
    ];

    const allPOIs = [
        // Education
        { id: 'school_lomonosov', x: 230, y: 150, label: language === 'ru' ? 'Ломоносовская школа' : 'Lomonosov School', type: 'education', icon: GraduationCap, time: '5 min', image: '/assets/poi/school.jpg' },
        { id: 'school_wunder', x: 190, y: 90, label: 'Wunderpark', type: 'education', icon: GraduationCap, time: '12 min', image: '/assets/poi/wunderpark.jpg' },

        // Shopping
        { id: 'shop_barvikha', x: 180, y: 80, label: 'Barvikha Luxury Village', type: 'shopping', icon: ShoppingBag, time: '10 min', image: '/assets/poi/barvikha.jpg' },
        { id: 'shop_dream', x: 230, y: 120, label: 'Dream House', type: 'shopping', icon: ShoppingBag, time: '8 min', image: '/assets/poi/dream.jpg' },

        // Dining
        { id: 'rest_tsarskaya', x: 180, y: 280, label: language === 'ru' ? 'Царская Охота' : 'Tsarskaya Okhota', type: 'dining', icon: Utensils, time: '7 min', image: '/assets/poi/restaurant.jpg' },
        { id: 'rest_mario', x: 160, y: 260, label: 'Mario', type: 'dining', icon: Utensils, time: '6 min', image: '/assets/poi/mario.jpg' },

        // Health & Wellness
        { id: 'health_lapino', x: 300, y: 200, label: language === 'ru' ? 'КГ Лапино' : 'Lapino Hospital', type: 'health', icon: HeartPulse, time: '15 min', image: '/assets/poi/lapino.jpg' },
        { id: 'sport_worldclass', x: 280, y: 310, label: 'World Class', type: 'sport', icon: Dumbbell, time: '12 min', image: '/assets/poi/worldclass.jpg' },

        // Leisure
        { id: 'park_razdolye', x: 280, y: 310, label: language === 'ru' ? 'Парк Раздолье' : 'Razdolye Park', type: 'sport', icon: '🌳', time: '12 min', image: '/assets/poi/park.jpg' }
    ];

    // Filter logic
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    useEffect(() => {
        // Set default filters based on activePersona
        if (displayPersona === 'Target_Family') setActiveFilters(['education', 'sport', 'health']);
        else if (displayPersona === 'Target_Investor') setActiveFilters(['shopping', 'dining']);
        else if (displayPersona === 'Target_Party') setActiveFilters(['dining', 'shopping', 'sport']);
    }, [displayPersona]);

    const filterLabels: Record<string, { en: string; ru: string }> = {
        education: { en: 'Education', ru: 'Образование' },
        shopping: { en: 'Shopping', ru: 'Шопинг' },
        dining: { en: 'Dining', ru: 'Рестораны' },
        health: { en: 'Health', ru: 'Здоровье' },
        sport: { en: 'Sport', ru: 'Спорт' }
    };

    const toggleFilter = (type: string) => {
        setActiveFilters(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const visiblePOIs = allPOIs.filter(poi => activeFilters.includes(poi.type));


    return (
        <section className="relative w-full py-24 bg-[#050505] text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

                {/* Text Content */}
                <div className="col-span-1 z-10 flex flex-col justify-center h-full">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-primary text-sm tracking-[0.2em] uppercase font-bold mb-4">
                            {language === 'ru' ? 'Локация' : 'Location'}
                        </h2>
                        <h3 className="text-3xl md:text-5xl font-serif mb-6">
                            {language === 'ru' ? 'В центре событий' : 'In the center of events'}
                        </h3>
                        <p className="text-white/60 mb-8 leading-relaxed">
                            {highlights}
                        </p>

                        {/* Address Block */}
                        <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary/20 rounded-lg text-primary mt-1">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium mb-2">
                                        {language === 'ru' ? 'Коттеджный поселок "Никологорские Дачи"' : 'Nikologorskie Dachi Residence'}
                                    </h4>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                        {language === 'ru'
                                            ? 'Никологорские дачи, Маслово, Московская обл., Россия, 143030'
                                            : 'Nikologorskie Dachi, Maslovo, Moscow Region, Russia, 143030'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {routes.map((route) => (
                                <div
                                    key={route.id}
                                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-colors"
                                >
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-3">
                                            <Navigation size={18} style={{ color: route.color }} />
                                            <span className="font-medium">{route.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-white/50 ml-8">
                                            <Clock size={12} />
                                            {route.time}
                                        </div>
                                    </div>

                                    <a
                                        href={route.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100"
                                        title={language === 'ru' ? "Открыть маршрут" : "Open route"}
                                    >
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Interactive Map Iframe */}
                <div className="col-span-1 md:col-span-2 relative h-[600px] w-full bg-[#111] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?ll=37.046903%2C55.736022&z=11&mode=search&text=КП%20Никологорские%20Дачи"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen={true}
                        className="w-full h-full grayscale invert brightness-75 contrast-125 hover:grayscale-0 hover:invert-0 hover:brightness-100 transition-all duration-700"
                        style={{ filter: "grayscale(100%) invert(92%) contrast(83%)" }}
                    ></iframe>

                    {/* Overlay Tip */}
                    <div className="absolute top-4 right-4 pointer-events-none">
                        <div className="bg-black/80 backdrop-blur text-xs text-white/50 px-3 py-1 rounded-full border border-white/10">
                            {language === 'ru' ? 'Интерактивная карта' : 'Interactive Map'}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
