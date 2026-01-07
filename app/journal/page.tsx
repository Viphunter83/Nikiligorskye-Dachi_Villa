'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { JOURNAL_POSTS } from '@/data/journal-posts';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { usePersona } from '@/lib/store/use-persona';
import { useEffect, useState } from 'react';

export default function JournalPage() {
    const { language } = usePersona();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Prevent hydration mismatch

    const content = {
        ru: {
            tag: 'Журнал',
            title: 'Истории',
            subtitle: 'из Резиденции',
            desc: 'Архитектура, стиль жизни и инвестиционный потенциал. Погрузитесь в философию дома, который меняет стандарты.',
            read: 'Читать статью'
        },
        en: {
            tag: 'Journal',
            title: 'Stories',
            subtitle: 'from the Residence',
            desc: 'Architecture, lifestyle, and investment potential. Immerse yourself in the philosophy of a home that changes standards.',
            read: 'Read Article'
        }
    };

    const t = content[language];

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]">
            {/* Header */}
            <div className="relative pt-32 pb-16 px-6">
                <div className="max-w-[1400px] mx-auto">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm tracking-wider uppercase">
                        {t.tag}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-playfair font-medium leading-tight mb-6">
                        {t.title} <span className="text-white/40">{language === 'en' ? 'from the' : 'из'}</span><br />
                        <span className="italic text-[#D4AF37]">{language === 'en' ? 'Residence' : 'Резиденции'}</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl font-light leading-relaxed">
                        {t.desc}
                    </p>
                </div>
            </div>

            {/* Grid */}
            <div className="px-6 pb-32">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {JOURNAL_POSTS.map((post) => (
                        <Link key={post.id} href={`/journal/${post.slug}`} className="group block h-full">
                            <GlassCard
                                className="h-full flex flex-col min-h-[400px] p-0 overflow-hidden hover:border-[#D4AF37]/30 transition-colors"
                                image={post.coverImage}
                            >
                                <div className="relative h-full flex flex-col justify-end p-8 bg-gradient-to-t from-black via-black/60 to-transparent">
                                    <div className="flex items-center gap-3 mb-4 text-xs tracking-widest text-[#D4AF37] uppercase">
                                        <span>{post.date[language]}</span>
                                        <span className="w-1 h-1 rounded-full bg-white/30" />
                                        <span>{post.readTime[language]}</span>
                                    </div>

                                    <h3 className="text-2xl font-playfair mb-3 leading-snug group-hover:text-[#D4AF37] transition-colors">
                                        {post.title[language]}
                                    </h3>

                                    <p className="text-white/70 line-clamp-3 font-light text-sm mb-6 leading-relaxed">
                                        {post.excerpt[language]}
                                    </p>

                                    <div className="flex items-center gap-2 text-sm text-white group-hover:text-[#D4AF37] transition-colors">
                                        {t.read}
                                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </div>
                                </div>
                            </GlassCard>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
