import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Hardcoded initial data from data/house-data.ts to avoid build/import issues
const INITIAL_DATA = {
    slug: "nikologorskie",
    headline_family: "Родовое гнездо на Новой Риге: Безопасность и приватность",
    headline_investor: "Недооцененный актив Premium-класса",
    headline_party: "Резиденция в стиле Райта с видом на Сити",
    price_display: "По запросу",
    features_json: {
        Specs: {
            Area_Legal: 506,
            Area_Total: 746,
            Plot: 14,
            Bedrooms: 7,
            Bathrooms: 7,
            CeilingHeight: 7,
            YearBuilt: 2025
        },
        Meta: {
            Project_Name: {
                ru: "Резиденция «Никологорские Дачи»",
                en: "Residence Nikologorskie Dachi"
            }
        }
    }
}

async function main() {
    console.log('Start seeding ...')

    const house = await prisma.houseProfile.upsert({
        where: { slug: INITIAL_DATA.slug },
        update: {},
        create: {
            slug: INITIAL_DATA.slug,
            headline_family: INITIAL_DATA.headline_family,
            headline_investor: INITIAL_DATA.headline_investor,
            headline_party: INITIAL_DATA.headline_party,
            price_display: INITIAL_DATA.price_display,
            features_json: INITIAL_DATA.features_json,
        },
    })

    console.log(`Created/Updated house profile: ${house.slug}`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
