'use client'

import { useRef } from 'react'
import { usePersona } from '@/lib/store/use-persona'
import { PersonaContent, PersonaType } from '@/data/house-data'

interface PersonaProviderProps {
    children: React.ReactNode
    initialData: Record<PersonaType, PersonaContent>
}

export default function PersonaProvider({
    children,
    initialData,
}: PersonaProviderProps) {
    const initialized = useRef(false)

    if (!initialized.current) {
        usePersona.getState().setAllContent(initialData)
        initialized.current = true
    }

    return <>{children}</>
}
