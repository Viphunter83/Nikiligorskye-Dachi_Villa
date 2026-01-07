'use client';

import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Check } from 'lucide-react';
import { JOURNAL_POSTS } from '@/data/journal-posts';
import { GlassCard } from '@/components/ui/GlassCard';
import { usePersona } from '@/lib/store/use-persona';
import { useEffect, useState, use } from 'react';

interface ArticlePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = use(params);
    const router = useRouter();
    const { language, setPersona, activePersona } = usePersona();
    const [mounted, setMounted] = useState(false);

    const post = JOURNAL_POSTS.find((p) => p.slug === slug);

    useEffect(() => {
        setMounted(true);
        // Smart Personalization: Auto-switch persona based on content
        if (post && post.relatedPersona !== activePersona) {
            setPersona(post.relatedPersona);
        }
    }, [post, setPersona, activePersona]);

    if (!post) {
        notFound();
    }

    // Content for UI elements
    const ui = {
        ru: {
            back: 'Назад в Журнал',
            reading: 'чтения',
            interested: 'Заинтересовались?',
            desc: 'Почувствуйте атмосферу резиденции вживую. Забронируйте приватный просмотр через консьержа.',
            benefits: ['Персональный тур', 'Архитектурный гид', 'Инвестиционная консультация'],
            cta: 'ЗАБРОНИРОВАТЬ ПРОСМОТР',
            powered: 'Powered by Alfred Concierge'
        },
        en: {
            back: 'Back to Journal',
            reading: 'reading',
            interested: 'Interested?',
            desc: 'Experience the residence firsthand. Book a private viewing with our concierge.',
            benefits: ['Personal Tour', 'Architecture Guide', 'Investment Consultation'],
            cta: 'BOOK VIEWING',
            powered: 'Powered by Alfred Concierge'
        }
    };

    const t = ui[language];

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#111] text-white selection:bg-[#D4AF37]/30 selection:text-[#D4AF37] relative">
            {/* Background Texture */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[#1a1a1a]/80 z-10" />
                <img
                    src="/assets/bg_texture_luxury.png"
                    alt=""
                    className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
            </div>

            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-[#D4AF37]/20 z-50">
                <div className="h-full bg-[#D4AF37] w-0" id="reading-progress" />
            </div>

            {/* Hero Header */}
            <div className="relative h-[60vh] min-h-[500px] w-full">
                <Image
                    src={post.coverImage}
                    alt={post.title[language]}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />

                <div className="absolute inset-0 flex items-end pb-20 px-6">
                    <div className="max-w-[1400px] mx-auto w-full">
                        <Link
                            href="/journal"
                            className="inline-flex items-center gap-2 text-white/60 hover:text-[#D4AF37] transition-colors mb-8 group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            {t.back}
                        </Link>

                        <div className="flex items-center gap-6 text-sm tracking-wider uppercase text-white/80 mb-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                                {post.date[language]}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[#D4AF37]" />
                                {post.readTime[language]} {t.reading}
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-medium leading-tight max-w-4xl">
                            {post.title[language]}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="max-w-[1400px] mx-auto px-6 py-12 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">

                    {/* Article Body */}
                    <div className="lg:col-span-8">
                        <div
                            className="prose prose-invert prose-lg max-w-none prose-headings:font-playfair prose-headings:font-medium prose-headings:text-[#D4AF37] prose-p:text-white/80 prose-p:font-light prose-p:leading-relaxed prose-li:text-white/80 prose-li:marker:text-[#D4AF37]"
                            dangerouslySetInnerHTML={{ __html: post.content[language] }}
                        />
                    </div>

                    {/* Sticky Sidebar */}
                    <div className="lg:col-span-4 relative">
                        <div className="sticky top-32">
                            <GlassCard className="p-8 border-[#D4AF37]/20 bg-[#D4AF37]/5">
                                <h3 className="text-2xl font-playfair mb-2">{t.interested}</h3>
                                <p className="text-white/60 text-sm mb-6 font-light">
                                    {t.desc}
                                </p>

                                <ul className="space-y-4 mb-8">
                                    {t.benefits.map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                                            <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0">
                                                <Check className="w-3 h-3 text-[#D4AF37]" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => router.push('/#alfred-concierge')}
                                    className="w-full py-4 bg-[#D4AF37] text-black font-medium tracking-wide hover:bg-[#b8962e] transition-colors rounded-none uppercase"
                                >
                                    {t.cta}
                                </button>

                                <p className="text-center mt-4 text-xs text-white/40">
                                    {t.powered}
                                </p>
                            </GlassCard>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
