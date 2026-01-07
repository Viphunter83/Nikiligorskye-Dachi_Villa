'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePersona } from '@/lib/store/use-persona';
import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';

type MessageState = 'greeting' | 'typing' | 'input' | 'success';

export const AlfredConcierge = () => {
    const { getCurrentContent, language } = usePersona();
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setState('typing');
        setTimeout(() => {
            setState('success');
        }, 1500);
    };

    return (
        <section id="alfred-concierge" className="relative w-full py-24 bg-gradient-to-b from-[#050505] to-black flex justify-center items-center">

            <div className="w-full max-w-md px-4">
                <div className="relative bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden min-h-[400px] flex flex-col">

                    {/* Header */}
                    <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <Bot size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-serif font-medium">Alfred Concierge</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-xs text-white/50">{language === 'ru' ? 'Онлайн' : 'Online'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 p-6 space-y-6 overflow-y-auto">

                        {/* Greeting */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex gap-3"
                        >
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary text-xs">A</div>
                            <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none text-white/90 text-sm leading-relaxed max-w-[85%]">
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
                                    className="flex flex-col gap-2 ml-11"
                                >
                                    {quickReplies.map((reply) => (
                                        <button
                                            key={reply.id}
                                            onClick={handleQuickReply}
                                            className="bg-white/5 hover:bg-primary/20 hover:border-primary/50 border border-white/10 text-white/80 py-3 px-4 rounded-xl text-sm transition-all text-left"
                                        >
                                            {language === 'ru' ? reply.ru : reply.en}
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
                                className="flex gap-3"
                            >
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary text-xs">A</div>
                                <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                </div>
                            </motion.div>
                        )}

                        {/* Input Form */}
                        {state === 'input' && (
                            <motion.form
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onSubmit={handleSubmit}
                                className="flex gap-2 items-center mt-4"
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    autoFocus
                                    placeholder={language === 'ru' ? "Ваш телефон или Telegram..." : "Your Phone or Telegram..."}
                                    className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 text-sm"
                                />
                                <button type="submit" className="p-3 bg-primary text-black rounded-xl hover:bg-primary/90 transition-colors">
                                    <Send size={18} />
                                </button>
                            </motion.form>
                        )}

                        {/* Success Message */}
                        {state === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-8"
                            >
                                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User size={32} />
                                </div>
                                <h4 className="text-white font-semibold mb-2">
                                    {language === 'ru' ? 'Заявка принята!' : 'Request Received!'}
                                </h4>
                                <p className="text-white/50 text-sm">
                                    {language === 'ru' ? 'Менеджер свяжется с вами в течение 10 минут.' : 'Our manager will contact you within 10 minutes.'}
                                </p>
                            </motion.div>
                        )}

                    </div>
                </div>
            </div>

        </section>
    );
};
