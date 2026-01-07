'use client'

import { useEffect, useRef } from 'react'
import { incrementSeoView } from '@/lib/actions'

export function SeoTracker({ slug }: { slug: string }) {
    const initialized = useRef(false)

    useEffect(() => {
        // Prevent double counting in Strict Mode or re-renders
        if (initialized.current) return
        initialized.current = true

        // Simple Session Deduping
        const sessionKey = `viewed_${slug}`
        if (sessionStorage.getItem(sessionKey)) return

        // Track View
        incrementSeoView(slug)
        sessionStorage.setItem(sessionKey, 'true')

    }, [slug])

    return null
}
