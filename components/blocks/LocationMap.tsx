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
                <div className="col-span-1 z-10">
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

                        <div className="space-y-4">
                            {routes.map((route) => (
                                <div
                                    key={route.id}
                                    onMouseEnter={() => setActiveRoute(route.id)}
                                    // onMouseLeave={() => setActiveRoute(null)} // Keep active for demo
                                    className={`p-4 rounded-xl border transition-all flex items-center justify-between group/route
                                        ${activeRoute === route.id
                                            ? 'bg-white/10 border-white/30'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                                        }`}
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
                                        className={`p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors ${activeRoute === route.id ? 'opacity-100' : 'opacity-0 group-hover/route:opacity-100'}`}
                                        title={language === 'ru' ? "Открыть маршрут" : "Open route"}
                                    >
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Abstract Map */}
                <div className="col-span-1 md:col-span-2 relative h-[600px] w-full bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden group">
                    {/* Filters Overlay */}
                    <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap gap-2 pointer-events-none opacity-0 md:opacity-100 transition-opacity">
                        {['education', 'shopping', 'dining', 'health', 'sport'].map(type => (
                            <button
                                key={type}
                                onClick={() => toggleFilter(type)}
                                className={`pointer-events-auto px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md transition-all
                                    ${activeFilters.includes(type)
                                        ? 'bg-white text-black border-white'
                                        : 'bg-black/50 text-white border-white/20 hover:bg-black/70'}`}
                            >
                                {filterLabels[type][language]}
                            </button>
                        ))}
                    </div>

                    {/* Map Background Image */}
                    <div className="absolute inset-0 bg-[#050505]">
                        <img
                            src="/assets/map_nikolina_custom.png"
                            alt="Nikolina Gora Map"
                            className="w-full h-full object-cover opacity-60 invert grayscale contrast-125 transition-all duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent"></div>
                    </div>

                    {/* SVG Layer */}
                    <svg
                        className="absolute inset-0 w-full h-full z-10"
                        viewBox="0 0 450 450"
                        preserveAspectRatio="xMidYMid slice"
                    >

                        {/* Routes aligned with new map roads */}
                        {routes.map((route) => (
                            <motion.path
                                key={route.id}
                                d={route.path // Keep abstract curves, they look like GPS routes
                                    .replace("M 10 350", "M 10 400") // Start lower
                                    .replace("T 300 150", "T 280 180")
                                }
                                fill="none"
                                stroke={route.color}
                                strokeWidth={activeRoute === route.id ? 4 : 2}
                                strokeOpacity={activeRoute === route.id ? 1 : 0.5}
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="transition-all duration-300 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"
                            />
                        ))}

                        {/* Premium House Beacon */}
                        <foreignObject x="250" y="160" width="80" height="80" style={{ overflow: 'visible' }}>
                            <div className="relative flex items-center justify-center w-20 h-20 -ml-10 -mt-10">
                                {/* Radar Waves */}
                                <motion.div
                                    className="absolute inset-0 border border-primary/30 rounded-full"
                                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <motion.div
                                    className="absolute inset-0 border border-primary/20 rounded-full"
                                    animate={{ scale: [1, 3], opacity: [0.3, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                />
                                {/* Core */}
                                <div className="relative w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_rgba(212,175,55,1)] z-10 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                </div>
                                <div className="absolute top-full mt-2 text-[10px] tracking-widest text-primary font-bold uppercase drop-shadow-md">
                                    Villa
                                </div>
                            </div>
                        </foreignObject>

                        {/* Dynamic POIs */}
                        <AnimatePresence>
                            {visiblePOIs.map((poi) => (
                                <foreignObject key={poi.id} x={poi.x} y={poi.y} width="40" height="40" style={{ overflow: 'visible' }}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                        className="relative group/poi flex items-center justify-center w-10 h-10"
                                    >
                                        <div className="absolute inset-0 bg-black/80 backdrop-blur-md rounded-full border border-white/20 shadow-xl" />
                                        <div className="relative z-10 text-white">
                                            {typeof poi.icon === 'string' ? (
                                                <span className="text-lg">{poi.icon}</span>
                                            ) : (
                                                <poi.icon className="w-4 h-4" />
                                            )}
                                        </div>

                                        {/* Premium Photo Tooltip */}
                                        <div className={`absolute left-1/2 -translate-x-1/2 ${poi.y > 225 ? 'bottom-full mb-3 origin-bottom' : 'top-full mt-3 origin-top'} opacity-0 group-hover/poi:opacity-100 transition-all duration-300 pointer-events-none z-50`}>
                                            <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-[200px]">
                                                {/* Image Area */}
                                                <div className="h-24 w-full bg-gray-900 relative">
                                                    {poi.image && (
                                                        <img
                                                            src={poi.image}
                                                            alt={poi.label}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/poi:scale-110"
                                                        />
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
                                                    <div className="absolute top-2 right-2 text-white/90 drop-shadow-md">
                                                        {typeof poi.icon === 'string' ? poi.icon : <poi.icon size={16} />}
                                                    </div>
                                                </div>
                                                {/* Content */}
                                                <div className="p-3 text-center">
                                                    <div className="text-xs font-bold text-white mb-1">{poi.label}</div>
                                                    <div className="flex items-center justify-center gap-3 text-[10px] text-white/60">
                                                        <span className="flex items-center gap-1 text-primary">
                                                            <Clock size={10} />
                                                            {poi.time}
                                                        </span>
                                                        <span>•</span>
                                                        <span>{activeFilters.includes(poi.type) ? filterLabels[poi.type][language] : 'Spot'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </foreignObject>
                            ))}
                        </AnimatePresence>

                    </svg>

                    {/* Corner Legend/Credits */}
                    <div className="absolute bottom-4 right-4 z-20 pointer-events-none text-[10px] text-white/20">
                        Designed for Nikiligorskye Dachi
                    </div>

                </div>

            </div>
        </section>
    );
};
