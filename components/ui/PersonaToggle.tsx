'use client';

import { motion } from 'framer-motion';
import { usePersona } from '@/lib/store/use-persona';
import { PersonaType } from '@/data/house-data';

import { useState, useEffect } from 'react';

export const PersonaToggle = () => {
    const { activePersona, setPersona, language } = usePersona();

    // Although language is used for labels, it's text content, which React can patch up, 
    // but activePersona drives the layout/animation state which is critical for hydration matches.
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const displayPersona = mounted ? activePersona : 'Target_Family';

    const labels: Record<PersonaType, Record<string, string>> = {
        Target_Family: { en: 'Family', ru: 'Семья' },
        Target_Investor: { en: 'Investor', ru: 'Инвестор' },
        Target_Party: { en: 'Lifestyle', ru: 'Светская жизнь' },
    };

    const tabs: { id: PersonaType; label: string }[] = [
        { id: 'Target_Family', label: labels['Target_Family'][language] },
        { id: 'Target_Investor', label: labels['Target_Investor'][language] },
        { id: 'Target_Party', label: labels['Target_Party'][language] },
    ];

    return (
        <div className="flex p-1 space-x-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setPersona(tab.id)}
                    className={`${displayPersona === tab.id ? '' : 'hover:text-white/80'
                        } relative rounded-full px-6 py-2 text-sm font-medium text-white transition focus-visible:outline-2`}
                    style={{
                        WebkitTapHighlightColor: 'transparent',
                    }}
                >
                    {displayPersona === tab.id && (
                        <motion.span
                            layoutId="bubble"
                            className="absolute inset-0 z-10 bg-white/10 mix-blend-difference rounded-full"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    {tab.label}
                </button>
            ))}
        </div>
    );
};
