'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-4 left-4 right-4 z-50 md:max-w-md mx-auto md:mx-0 md:left-6"
            >
                <div className="bg-[#111]/90 backdrop-blur-md border border-white/10 p-5 rounded-xl shadow-2xl flex flex-col gap-4">
                    <p className="text-xs text-white/70 leading-relaxed font-light">
                        Мы используем файлы cookie для улучшения работы сайта и анализа трафика. Продолжая использовать сайт, вы соглашаетесь с нашей{' '}
                        <a href="/privacy" className="text-[#D4AF37] hover:underline">
                            Политикой конфиденциальности
                        </a>.
                    </p>
                    <button
                        onClick={handleAccept}
                        className="w-full py-2 bg-[#D4AF37] text-black text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#c5a028] transition-colors"
                    >
                        Хорошо
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
