'use server'

import prisma from './db'
import { revalidatePath } from 'next/cache'

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
