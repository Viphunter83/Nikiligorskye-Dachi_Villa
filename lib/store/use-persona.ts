import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HOUSE_DATA, PersonaType, PersonaContent, Language } from '@/data/house-data';

interface PersonaState {
    activePersona: PersonaType;
    language: Language;
    content: Record<PersonaType, PersonaContent>;
    // Actions
    setPersona: (persona: PersonaType) => void;
    setLanguage: (lang: Language) => void;
    setAllContent: (content: Record<PersonaType, PersonaContent>) => void;
    // Selectors
    getCurrentContent: () => PersonaContent;
}

export const usePersona = create<PersonaState>()(
    persist(
        (set, get) => ({
            activePersona: 'Target_Family', // Default state
            language: 'ru', // Default language
            content: HOUSE_DATA.Content, // Initial fallback from file, wil be hydrated

            setPersona: (persona) => set({ activePersona: persona }),
            setLanguage: (lang) => set({ language: lang }),
            setAllContent: (content) => set({ content }),

            getCurrentContent: () => {
                const { activePersona, content } = get();
                return content[activePersona] || HOUSE_DATA.Content[activePersona];
            }
        }),
        {
            name: 'persona-storage', // unique name for localStorage key
            partialize: (state) => ({
                activePersona: state.activePersona,
                language: state.language
                // We do NOT persist content to localStorage to ensure fresh data on reload
            }),
        }
    )
);
