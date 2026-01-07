'use client';

import { motion } from 'framer-motion';
import { usePersona } from '@/lib/store/use-persona';
import { MapPin, Navigation, Clock } from 'lucide-react';
import { useState } from 'react';

export const LocationMap = () => {
    const { getCurrentContent, language } = usePersona();
    const content = getCurrentContent();
    const [activeRoute, setActiveRoute] = useState<string | null>(null);

    const highlights = content.Location_Highlights?.[language];

    const routes = [
        {
            id: 'rublevo',
            name: language === 'ru' ? 'Рублево-Успенское ш.' : 'Rublevo-Uspenskoe Hwy',
            time: '25 min',
            color: '#D4AF37', // Gold
            path: "M 10 350 Q 80 300 150 250 T 300 150",
        },
        {
            id: 'novoriga',
            name: language === 'ru' ? 'Новорижское ш.' : 'Novorizhskoe Hwy',
            time: '35 min',
            color: '#3B82F6', // Blue
            path: "M 10 100 Q 150 120 300 150",
        },
        {
            id: 'ilyinskoe',
            name: language === 'ru' ? 'Ильинское ш.' : 'Ilyinskoe Hwy',
            time: '40 min',
            color: '#10B981', // Green
            path: "M 10 250 Q 100 250 200 200 T 300 150",
        }
    ];

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
                                    onMouseLeave={() => setActiveRoute(null)}
                                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between
                                        ${activeRoute === route.id
                                            ? 'bg-white/10 border-white/30'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Navigation size={18} style={{ color: route.color }} />
                                        <span className="font-medium">{route.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-white/50">
                                        <Clock size={14} />
                                        {route.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Abstract Map */}
                <div className="col-span-1 md:col-span-2 relative h-[500px] w-full bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden group">
                    {/* Map Noise/Texture */}
                    <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')]"></div>

                    <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                        {/* Grid Lines for style */}
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid)" />

                        {/* Routes */}
                        {routes.map((route) => (
                            <motion.path
                                key={route.id}
                                d={route.path}
                                fill="none"
                                stroke={route.color}
                                strokeWidth={activeRoute === route.id ? 4 : 2}
                                strokeOpacity={activeRoute === route.id ? 1 : 0.3}
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="transition-all duration-300"
                            />
                        ))}

                        {/* House Marker */}
                        <foreignObject x="280" y="130" width="40" height="40">
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                className="relative flex items-center justify-center w-10 h-10"
                            >
                                <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping"></div>
                                <div className="relative bg-primary text-black p-2 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.6)]">
                                    <MapPin size={20} />
                                </div>
                            </motion.div>
                        </foreignObject>

                        {/* MKAD Label/Line (Abstract representation on left) */}
                        <line x1="10" y1="0" x2="10" y2="400" stroke="white" strokeOpacity="0.1" strokeWidth="2" strokeDasharray="5 5" />
                        <text x="20" y="380" fill="white" fillOpacity="0.3" fontSize="12" style={{ writingMode: 'vertical-rl' }}>MKAD RING ROAD</text>

                    </svg>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-l from-[#050505] via-transparent to-transparent"></div>
                </div>

            </div>
        </section>
    );
};
