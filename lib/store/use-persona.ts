import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HOUSE_DATA, PersonaType, PersonaContent, Language } from '@/data/house-data';

interface PersonaState {
    activePersona: PersonaType;
    language: Language;
    // Actions
    setPersona: (persona: PersonaType) => void;
    setLanguage: (lang: Language) => void;
    // Selectors
    getCurrentContent: () => PersonaContent;
}

export const usePersona = create<PersonaState>()(
    persist(
        (set, get) => ({
            activePersona: 'Target_Family', // Default state will be overwritten by storage if exists
            language: 'ru', // Default language

            setPersona: (persona) => set({ activePersona: persona }),
            setLanguage: (lang) => set({ language: lang }),

            getCurrentContent: () => {
                const { activePersona } = get();
                return HOUSE_DATA.Content[activePersona];
            }
        }),
        {
            name: 'persona-storage', // unique name for localStorage key
        }
    )
);
