'use client';

import { motion } from 'framer-motion';
import { usePersona } from '@/lib/store/use-persona';
import { PersonaType } from '@/data/house-data';

export const PersonaToggle = () => {
    const { activePersona, setPersona } = usePersona();

    const tabs: { id: PersonaType; label: string }[] = [
        { id: 'Target_Family', label: 'Family' },
        { id: 'Target_Investor', label: 'Investor' },
        { id: 'Target_Party', label: 'Lifestyle' },
    ];

    return (
        <div className="flex p-1 space-x-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setPersona(tab.id)}
                    className={`${activePersona === tab.id ? '' : 'hover:text-white/80'
                        } relative rounded-full px-6 py-2 text-sm font-medium text-white transition focus-visible:outline-2`}
                    style={{
                        WebkitTapHighlightColor: 'transparent',
                    }}
                >
                    {activePersona === tab.id && (
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
