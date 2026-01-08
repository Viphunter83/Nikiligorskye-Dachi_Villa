import { HeroSection } from '@/components/blocks/HeroSection'
import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SeoTracker } from '@/components/analytics/SeoTracker'

// Use ISR (Incremental Static Regeneration) or Force Dynamic if intended to see immediate changes
// For SEO performance, we typically wan't static, but we want it to update on build.
// Since we are adding pages via Admin, we can't key off a static file list anymore purely at build time 
// UNLESS we are okay with rebuilding to see new pages. 
// OR we use generateStaticParams + dynamicParams = true (which is default).
// This allows new pages to be generated on demand.

export const dynamicParams = true // Allow dynamic access for pages not generated at build

export async function generateStaticParams() {
    const pages = await prisma.seoPage.findMany({ select: { slug: true } })
    return pages.map((page: { slug: string }) => ({
        slug: page.slug,
    }))
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    // Fetch from DB instead of file
    const location = await prisma.seoPage.findUnique({
        where: { slug }
    })

    if (!location) {
        notFound()
    }

    const cleanTitle = location.title.replace(/Особняк у /i, '');
    const dynamicHeadline = `${location.title} — всего ${location.minutes} минут на авто`

    return (
        <main>
            <HeroSection
                cmsHeadlines={{
                    'Target_Family': dynamicHeadline,
                    'Target_Investor': dynamicHeadline,
                    'Target_Party': dynamicHeadline
                }}
            />

            <section className="py-20 bg-background">
                <div className="container px-4 mx-auto">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <h2 className="text-3xl font-light">Дом, который подстраивается под ваш ритм</h2>
                        <p className="text-lg text-muted-foreground">
                            Выбирая особняк в «Никологорских Дачах», вы получаете не только приватность,
                            но и мгновенный доступ к инфраструктуре уровня люкс.
                            <br /><br />
                            <strong>{cleanTitle}</strong> находится всего в {location.minutes} минутах комфортной езды.
                        </p>

                        <div className="h-[400px] w-full bg-slate-100 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-inner border border-white/10">
                            <iframe
                                src={`https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(cleanTitle)}&z=14`}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allowFullScreen={true}
                                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                                style={{ filter: "grayscale(100%) contrast(1.1)" }}
                            ></iframe>
                        </div>

                        <div className="pt-8">
                            <Link href="/#contact">
                                <Button size="lg" className="rounded-full px-8 text-lg h-14 bg-primary text-primary-foreground hover:bg-primary/90">
                                    Записаться на просмотр по пути в {cleanTitle}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
