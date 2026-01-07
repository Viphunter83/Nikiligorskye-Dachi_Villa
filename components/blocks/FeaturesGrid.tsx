'use client';

import { usePersona } from '@/lib/store/use-persona';
import { motion } from 'framer-motion';
import { Check, Star, Shield, Zap, Heart } from 'lucide-react';

export const FeaturesGrid = () => {
    const { getCurrentContent, language } = usePersona();
    const content = getCurrentContent();

    const amenities = content.Amenities?.map(a => a[language]) || [];
    const description = content.Detailed_Description?.[language];

    // Icons mapping just for visual variety
    const icons = [Star, Shield, Heart, Zap, Check];

    return (
        <section className="relative w-full py-24 bg-[#0a0a0a] border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left: Detailed Description (Typography) */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-primary text-sm tracking-[0.2em] uppercase font-bold mb-6">
                                {language === 'ru' ? 'О ПРОЕКТЕ' : 'ABOUT PROJECT'}
                            </h2>
                            <p className="text-2xl md:text-3xl font-serif text-white leading-relaxed">
                                {description}
                            </p>
                            <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent mt-8"></div>
                        </motion.div>
                    </div>

                    {/* Right: Amenities Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {amenities.map((item, index) => {
                            const Icon = icons[index % icons.length];
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group"
                                >
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                        <Icon size={20} />
                                    </div>
                                    <h3 className="text-lg text-white font-medium">{item}</h3>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>

            </div>
        </section>
    );
};
