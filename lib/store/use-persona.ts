// lib/store/use-persona.ts
import { create } from 'zustand';
import { HOUSE_DATA, PersonaType, PersonaContent } from '@/data/house-data';

interface PersonaState {
    activePersona: PersonaType;
    // Actions
    setPersona: (persona: PersonaType) => void;
    // Selectors (computed values)
    getCurrentContent: () => PersonaContent;
}

export const usePersona = create<PersonaState>((set, get) => ({
    activePersona: 'Target_Family', // Default state

    setPersona: (persona) => set({ activePersona: persona }),

    getCurrentContent: () => {
        const { activePersona } = get();
        return HOUSE_DATA.Content[activePersona];
    }
}));
