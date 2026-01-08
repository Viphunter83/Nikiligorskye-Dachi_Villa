'use server'

import prisma from './db'
import { revalidatePath } from 'next/cache'
import { PersonaType, PersonaContent } from '@/data/house-data'


// --- Existing Actions ---

export async function updateVisuals(formData: FormData) {
    const hero_image_url = formData.get('hero_image_url') as string
    const hero_overlay_opacity = parseInt(formData.get('hero_overlay_opacity') as string)
    const accent_color = formData.get('accent_color') as string

    // Retrieve existing data to preserve other fields
    const existing = await prisma.houseProfile.findUnique({ where: { slug: 'nikologorskie' } });
    const currentCms = existing?.cms_data as any || {};

    // Merge or Update
    const cms_data = {
        ...currentCms,
        engineering: [
            formData.get('eng_img_1') as string || '',
            formData.get('eng_img_2') as string || '',
            formData.get('eng_img_3') as string || '',
            formData.get('eng_img_4') as string || ''
        ],
        concierge: formData.get('concierge_bg') as string || '',
    }

    await prisma.houseProfile.update({
        where: { slug: 'nikologorskie' },
        data: {
            hero_image_url,
            hero_overlay_opacity,
            accent_color,
            cms_data
        }
    })
    revalidatePath('/')
    revalidatePath('/admin')
}

export async function updateHeadlines(formData: FormData) {
    const headline_family = formData.get('headline_family') as string
    const headline_investor = formData.get('headline_investor') as string
    const headline_party = formData.get('headline_party') as string
    const price_display = formData.get('price_display') as string

    await prisma.houseProfile.update({
        where: { slug: 'nikologorskie' },
        data: {
            headline_family,
            headline_investor,
            headline_party,
            price_display,
        },
    })

    revalidatePath('/')
    revalidatePath('/admin')
}

export async function updateHouseContent(persona: PersonaType, content: PersonaContent) {
    // 1. Fetch current data
    const existing = await prisma.houseProfile.findUnique({ where: { slug: 'nikologorskie' } });
    if (!existing) throw new Error("House not found");

    const currentCms = existing.cms_data as any || {};

    // 2. Update specific persona content
    const updatedCms = {
        ...currentCms,
        [persona]: content
    };

    // 3. Save
    await prisma.houseProfile.update({
        where: { slug: 'nikologorskie' },
        data: {
            cms_data: updatedCms
        }
    });

    revalidatePath('/');
    revalidatePath('/admin');
}

export async function getLeads() {
    const leads = await prisma.lead.findMany({
        orderBy: { createdAt: 'desc' },
    })
    return leads
}

export async function getHouseProfile() {
    return await prisma.houseProfile.findUnique({
        where: { slug: 'nikologorskie' },
    })
}

// --- SEO Actions ---

export async function createSeoPage(formData: FormData) {
    const keyword = formData.get('keyword') as string
    const minutes = parseInt(formData.get('minutes') as string)

    // AI-Light Generation Logic (Simulated for now, can be replaced with real LLM)
    // In a real scenario, this would call OpenAI/Gemini to generate text
    const title = `${keyword.charAt(0).toUpperCase() + keyword.slice(1)}`
    // Basic slug generation - in prod use a proper slugify library
    const slug = keyword.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')

    try {
        await prisma.seoPage.create({
            data: {
                slug,
                title: `Дом рядом с "${title}"`,
                minutes,
                keywords: keyword
            }
        })

        revalidatePath('/admin')
    } catch (e) {
        console.error("Failed to create page", e)
    }
}

export async function deleteSeoPage(id: string) {
    await prisma.seoPage.delete({ where: { id } })
    revalidatePath('/admin')
}

export async function getSeoPages() {
    return await prisma.seoPage.findMany({
        orderBy: { views: 'desc' } // Sort by popularity
    })
}

export async function incrementSeoView(slug: string) {
    try {
        await prisma.seoPage.update({
            where: { slug },
            data: {
                views: { increment: 1 },
                lastVisitedAt: new Date()
            }
        })
        revalidatePath('/admin') // Update admin stats in real-time
    } catch (e) {
        console.error("Failed to track view", e)
    }
}
