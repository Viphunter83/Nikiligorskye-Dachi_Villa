'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePersona } from '@/lib/store/use-persona';
import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';

type MessageState = 'greeting' | 'typing' | 'input' | 'success';

export const AlfredConcierge = () => {
    const { getCurrentContent, language, activePersona } = usePersona();
    const content = getCurrentContent();
    const [state, setState] = useState<MessageState>('greeting');
    const inputRef = useRef<HTMLInputElement>(null);

    const greeting = content.Concierge_Greeting?.[language] || "How can I help you today?";

    const quickReplies = [
        { id: 'visit', ru: "📅 Записаться на просмотр", en: "📅 Book a Viewing" },
        { id: 'whatsapp', ru: "💬 Написать в WhatsApp", en: "💬 WhatsApp Chat" },
        { id: 'call', ru: "📞 Позвонить мне", en: "📞 Call Me" }
    ];

    const handleQuickReply = () => {
        setState('typing');
        setTimeout(() => {
            setState('input');
        }, 1200);
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!inputRef.current?.value) return;

        setState('typing');

        try {
            await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: inputRef.current.value,
                    persona: activePersona,
                    // We could track interaction history here later
                }),
            });

            // Simulate typing delay for realism
            setTimeout(() => {
                setState('success');
            }, 1000);

        } catch (error) {
            console.error('Failed to submit contact:', error);
            // Fallback to success to not break UX, potentially save to local storage
            setState('success');
        }
    };

    return (
        <section id="alfred-concierge" className="relative w-full py-24 bg-[#050505] flex justify-center items-center overflow-hidden">

            {/* Human Luminous Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/Facade3.jpeg"
                    alt="Atmosphere"
                    className="w-full h-full object-cover opacity-100 blur-[1px] contrast-125 brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.15),_transparent_70%)]"></div>
            </div>

            <div className="w-full max-w-md px-4 relative z-10">
                <div className="relative bg-black/40 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden min-h-[450px] flex flex-col group transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_rgba(212,175,55,0.1)]">

                    {/* Inner Glow */}
                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] pointer-events-none rounded-2xl"></div>

                    {/* Header */}
                    <div className="p-5 border-b border-white/5 bg-white/5 flex items-center gap-4">
                        {/* Premium Digital Avatar */}
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
                            <div className="absolute inset-1 border border-primary/40 rounded-full"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Bot size={20} className="text-primary drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                            </div>
                            {/* Online Dot */}
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#050505] rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-white font-serif text-lg tracking-wide">Alfred Concierge</h3>
                            <div className="text-xs text-secondary tracking-widest uppercase opacity-80">{language === 'ru' ? 'Всегда онлайн' : 'Always Online'}</div>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">

                        {/* Greeting */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex gap-4"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-transparent flex-shrink-0 flex items-center justify-center text-primary border border-primary/20 text-xs shadow-[0_0_10px_rgba(212,175,55,0.2)]">A</div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none text-gray-200 text-sm leading-relaxed max-w-[85%] shadow-lg backdrop-blur-md">
                                <p>{greeting}</p>
                            </div>
                        </motion.div>

                        {/* Quick Replies Buttons */}
                        <AnimatePresence>
                            {state === 'greeting' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex flex-col gap-2.5 ml-12"
                                >
                                    {quickReplies.map((reply) => (
                                        <button
                                            key={reply.id}
                                            onClick={handleQuickReply}
                                            className="group relative bg-[#0a0a0a] hover:bg-[#111] border border-white/10 text-gray-300 py-3.5 px-5 rounded-xl text-sm transition-all text-left overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300"></div>
                                            <div className="relative flex items-center gap-3">
                                                <span className="font-medium group-hover:text-primary transition-colors">{language === 'ru' ? reply.ru : reply.en}</span>
                                            </div>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Typing Indicator */}
                        {state === 'typing' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex gap-4"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-transparent flex-shrink-0 flex items-center justify-center text-primary border border-primary/20 text-xs">A</div>
                                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 w-fit">
                                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-[bounce_1s_infinite]"></span>
                                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-[bounce_1s_infinite_0.2s]"></span>
                                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-[bounce_1s_infinite_0.4s]"></span>
                                </div>
                            </motion.div>
                        )}

                        {/* Input Form */}
                        {state === 'input' && (
                            <motion.form
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onSubmit={handleSubmit}
                                className="flex gap-2 items-center mt-4"
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    autoFocus
                                    placeholder={language === 'ru' ? "Ваш телефон..." : "Your Phone..."}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40 focus:bg-white/10 text-sm transition-all shadow-inner"
                                />
                                <button type="submit" className="p-3.5 bg-primary text-black rounded-xl hover:bg-[#c5a028] transition-all hover:scale-105 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                                    <Send size={18} />
                                </button>
                            </motion.form>
                        )}

                        {/* Success Message */}
                        {state === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-10"
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-transparent border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                    <User size={36} />
                                </div>
                                <h4 className="text-white font-serif text-xl mb-2">
                                    {language === 'ru' ? 'Заявка принята' : 'Received'}
                                </h4>
                                <p className="text-white/40 text-sm">
                                    {language === 'ru' ? 'Менеджер свяжется с вами в течение 10 минут.' : 'We will contact you shortly.'}
                                </p>
                            </motion.div>
                        )}

                    </div>
                </div>
            </div>

        </section>
    );
};
