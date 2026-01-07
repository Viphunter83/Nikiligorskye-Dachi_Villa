import { SEO_LOCATIONS } from '@/data/seo-locations'
import { HeroSection } from '@/components/blocks/HeroSection'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// 1. Generate Static Params for SSG
export async function generateStaticParams() {
    return SEO_LOCATIONS.map((loc) => ({
        slug: loc.slug,
    }))
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const location = SEO_LOCATIONS.find((loc) => loc.slug === slug)

    if (!location) {
        notFound()
    }

    // SEO-Optimized Dynamic Content
    const dynamicHeadline = `${location.title} — всего ${location.minutes} минут на авто`
    const dynamicSubheadline = `Идеальная локация для жизни: 506 м² фамильной резиденции с быстрым доступом к "${location.title}".`

    return (
        <main className="min-h-screen bg-neutral-900 text-white">
            {/* Reusing Hero Section with Overrides */}
            <HeroSection
                overrideHeadline={dynamicHeadline}
                overrideSubheadline={dynamicSubheadline}
            />

            {/* SEO Context Section */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    <div className="space-y-6">
                        <h2 className="text-4xl font-light text-neutral-200">Жизнь в ритме комфорта</h2>
                        <p className="text-lg text-neutral-400 leading-relaxed">
                            Выбирая нашу резиденцию, вы получаете не только роскошный дом, но и привилегию жить рядом с лучшей инфраструктурой района.
                            <strong className="text-white"> {location.title} </strong> находится всего в {location.minutes} минутах комфортной поездки.
                        </p>
                        <div className="pt-4">
                            <Link href="/">
                                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-8">
                                    Записаться на просмотр по пути в {location.title}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Placeholder for Map - In real app, this would be a dynamic map component */}
                    <div className="relative aspect-video bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-700 flex items-center justify-center group">
                        <div className="absolute inset-0 bg-[url('/Map_Placeholder.png')] bg-cover opacity-50 group-hover:opacity-70 transition-opacity" />
                        <div className="z-10 bg-neutral-900/80 backdrop-blur-md px-6 py-3 rounded-lg border border-neutral-600">
                            <span className="text-orange-500 font-bold block text-sm">MARSHRUT V POSTROEN</span>
                            <span className="text-white font-mono text-xl">{location.minutes} MIN</span>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    )
}
