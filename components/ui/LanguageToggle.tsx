'use client';

import { motion } from 'framer-motion';
import { usePersona } from '@/lib/store/use-persona';
import { Language } from '@/data/house-data';

export const LanguageToggle = () => {
    const { language, setLanguage } = usePersona();

    const languages: { id: Language; label: string }[] = [
        { id: 'ru', label: 'RU' },
        { id: 'en', label: 'EN' },
    ];

    return (
        <div className="fixed top-6 right-6 z-50 flex space-x-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-1">
            {languages.map((lang) => (
                <button
                    key={lang.id}
                    onClick={() => setLanguage(lang.id)}
                    className={`relative px-3 py-1 text-xs font-medium transition-colors ${language === lang.id ? 'text-black' : 'text-white/60 hover:text-white'
                        }`}
                >
                    {language === lang.id && (
                        <motion.div
                            layoutId="lang-highlight"
                            className="absolute inset-0 bg-white rounded shadow-sm"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{lang.label}</span>
                </button>
            ))}
        </div>
    );
};
