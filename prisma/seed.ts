const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Existing House Data
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

// Existing Static SEO Locations to Migrate
const SEO_LOCATIONS = [
    // Education
    { slug: 'shkola-president', title: 'Дом рядом со школой Президент', minutes: 7 },
    { slug: 'ism-rosinka', title: 'Вилла рядом с International School of Moscow', minutes: 20 },
    { slug: 'shkola-sosny', title: 'Дом у школы «Сосны»', minutes: 5 },
    { slug: 'lomonosov-school', title: 'Резиденция рядом с Ломоносовской школой', minutes: 15 },
    { slug: 'cambridge-school', title: 'Дом недалеко от Cambridge International School', minutes: 25 },
    { slug: 'kot-v-sapogah', title: 'Коттедж рядом с садом "Кот в Сапогах"', minutes: 8 },
    { slug: 'english-nursery', title: 'Вилла у English Nursery School', minutes: 10 },

    // Wellness & Sport
    { slug: 'pride-wellness', title: 'Особняк у Pride Wellness Club', minutes: 12 },
    { slug: 'world-class-zhukovka', title: 'Дом рядом с World Class Жуковка', minutes: 18 },
    { slug: 'ilinka-sport', title: 'Резиденция у Ильинка Спорт', minutes: 15 },

    // Dining & Lifestyle
    { slug: 'veterok', title: 'Особняк рядом с рестораном «Ветерок»', minutes: 12 },
    { slug: 'tsarskaya-ohota', title: 'Дом у ресторана «Царская Охота»', minutes: 15 },
    { slug: 'mario-village', title: 'Вилла рядом с Mario Village', minutes: 18 },
    { slug: 'wine-and-crab', title: 'Резиденция у Wine & Crab', minutes: 16 },
    { slug: 'zhukovka-plaza', title: 'Дом рядом с Zhukovka Plaza', minutes: 18 },
    { slug: 'dream-house', title: 'Особняк у ТЦ Dream House', minutes: 19 },
    { slug: 'barvikha', title: 'Рядом с Барвиха Luxury Village', minutes: 14 },

    // Geo / Nature
    { slug: 'moscow-river', title: 'Резиденция у Москвы-реки', minutes: 15 },
    { slug: 'nikolina-gora', title: 'Вилла на Николиной Горе', minutes: 5 },
    { slug: 'maslovo', title: 'Дом в Маслово', minutes: 3 },
    { slug: 'cotton-way', title: 'Особняк в поселке Коттон Вей', minutes: 4 },
    { slug: 'diplomat-beach', title: 'Резиденция у пляжа Дипломат', minutes: 6 },
    { slug: 'rublevka', title: 'Вилла на Рублевке', minutes: 10 },

    // Healthcare
    { slug: 'lapino-hospital', title: 'Дом рядом с госпиталем «Лапино»', minutes: 20 },
    { slug: 'medswiss-zhukovka', title: 'Резиденция у MedSwiss Жуковка', minutes: 19 }
];

async function main() {
    console.log('Start seeding ...')

    // 1. Seed House Profile
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

    // 2. Seed SEO Pages
    for (const loc of SEO_LOCATIONS) {
        await prisma.seoPage.upsert({
            where: { slug: loc.slug },
            update: {},
            create: {
                slug: loc.slug,
                title: loc.title,
                minutes: loc.minutes,
                keywords: loc.title, // Use title as initial keyword context
            }
        })
    }
    console.log(`Seeded ${SEO_LOCATIONS.length} SEO pages.`)

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
