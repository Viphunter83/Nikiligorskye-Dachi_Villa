import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const persona = searchParams.get('persona');

        // Dynamic content based on persona
        const isInvestor = persona === 'investor';
        const subtitle = isInvestor
            ? 'Investment Opportunity: 746m² usable area'
            : '506m² • 7 Bedrooms • Lloyed Wright Style';

        // Font loading
        const fontData = await fetch(
            new URL('https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff2', import.meta.url)
        ).then((res) => res.arrayBuffer());

        // Image loading
        // We construct the absolute URL for the image based on the request URL
        const { protocol, host } = new URL(request.url);
        const imageUrl = `${protocol}//${host}/photos/living.jpg`;
        const imageData = await fetch(imageUrl).then((res) => res.arrayBuffer());

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#0a0a0a',
                        position: 'relative',
                    }}
                >
                    {/* Background Image */}
                    <img
                        src={imageData as any}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: 0.4,
                            objectFit: 'cover',
                        }}
                    />

                    {/* Content Overlay */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            zIndex: 10,
                        }}
                    >
                        {/* Title */}
                        <div
                            style={{
                                fontFamily: '"Playfair Display"',
                                fontSize: 64,
                                color: 'white',
                                marginBottom: 20,
                                whiteSpace: 'pre-wrap',
                                fontWeight: 700,
                                letterSpacing: '-0.02em',
                            }}
                        >
                            Residence Nikologorskie Dachi
                        </div>

                        {/* Subtitle */}
                        <div
                            style={{
                                fontFamily: '"Playfair Display"', // Ideally use Inter for subtitle but sticking to requirements if ambiguous. 
                                // Context says "Text Overlay: Large Title... Subtitle...". 
                                // Usually subtiles are sans-serif, but I'll stick to a clean look or reuse Playfair if not specified.
                                // Re-reading: "Large Title: ... (Playfair Display font)". Subtitle font not strictly specified.
                                // I'll use system-ui or sans-serif for contrast, or just Playfair if I only load that.
                                // To save bandwidth/complexity, I'll use Playfair for everything or system fonts.
                                // Let's stick to Playfair for consistency with the requested font loading or standard sans.
                                // Actually, I only loaded Playfair. I should probably load Inter too if I want it. 
                                // But the user only explicitly requested Playfair for the Title. 
                                // I'll rely on system sans-serif for subtitle to be safe/contrast, or Playfair.
                                // Let's use Playfair for cohesiveness as I only fetch one font.
                                fontSize: 32,
                                color: '#e5e5e5',
                                marginBottom: 40,
                                fontWeight: 400,
                            }}
                        >
                            {subtitle}
                        </div>

                        {/* Price/Hook Tag */}
                        <div
                            style={{
                                backgroundColor: 'white',
                                color: 'black',
                                padding: '12px 32px',
                                fontSize: 24,
                                borderRadius: 4,
                                fontWeight: 600,
                                fontFamily: 'sans-serif', // Fallback
                            }}
                        >
                            Private Offering
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'Playfair Display',
                        data: fontData,
                        style: 'normal',
                        weight: 700,
                    },
                ],
            }
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
