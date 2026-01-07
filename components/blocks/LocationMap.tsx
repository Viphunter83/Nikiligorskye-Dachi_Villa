'use client';

import { motion } from 'framer-motion';
import { usePersona } from '@/lib/store/use-persona';
import { MapPin, Navigation, Clock } from 'lucide-react';
import { useState } from 'react';

export const LocationMap = () => {
    const { getCurrentContent, language, activePersona } = usePersona();
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

    const POIs = {
        Target_Family: [
            { id: 'school', x: 230, y: 150, label: language === 'ru' ? 'Ломоносовская школа' : 'Lomonosov School', icon: '🎓' },
            { id: 'park', x: 280, y: 310, label: language === 'ru' ? 'Парк Раздолье' : 'Razdolye Park', icon: '🌳' }
        ],
        Target_Investor: [
            { id: 'village', x: 180, y: 80, label: 'Barvikha Luxury Village', icon: '🛍️' },
            { id: 'dream', x: 230, y: 120, label: 'Dream House', icon: '💎' }
        ],
        Target_Party: [
            { id: 'city', x: 300, y: 40, label: language === 'ru' ? 'Москва-Сити' : 'Moscow City', icon: '🏙️' },
            { id: 'rest', x: 180, y: 280, label: language === 'ru' ? 'Рестораны' : 'Restaurants', icon: '🍸' }
        ]
    };

    const currentPOIs = POIs[activePersona as keyof typeof POIs] || POIs.Target_Family;

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
                    {/* Map Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src="/assets/map_nikolina_custom.png"
                            alt="Nikolina Gora Map"
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                    </div>

                    {/* Increased viewBox to prevent label clipping */}
                    <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 450 450" preserveAspectRatio="none">

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

                        {/* House Marker */}
                        <foreignObject x="250" y="160" width="40" height="40">
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

                        {/* Dynamic POIs with adjusted coords */}
                        {currentPOIs.map((poi) => (
                            <foreignObject key={poi.id} x={poi.x} y={poi.y} width="160" height="60">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-2 rounded-lg border border-white/20 shadow-xl hover:scale-105 transition-transform cursor-pointer"
                                >
                                    <span className="text-xl">{poi.icon}</span>
                                    <span className="text-xs text-white font-semibold whitespace-nowrap">{poi.label}</span>
                                </motion.div>
                            </foreignObject>
                        ))}

                    </svg>

                </div>

            </div>
        </section>
    );
};
