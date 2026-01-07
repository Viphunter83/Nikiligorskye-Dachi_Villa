'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

const YANDEX_METRICA_ID = 106167767;

export function YandexMetrica() {
    return (
        <Suspense fallback={null}>
            <MetricaLogic />
        </Suspense>
    );
}

function MetricaLogic() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // @ts-ignore
        if (typeof window.ym !== 'undefined') {
            // @ts-ignore
            window.ym(YANDEX_METRICA_ID, 'hit', window.location.href);
        }
    }, [pathname, searchParams]);

    return (
        <>
            <Script
                id="yandex-metrika"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${YANDEX_METRICA_ID}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                ecommerce:"dataLayer"
            });
          `,
                }}
            />
            <noscript>
                <div>
                    <img
                        src={`https://mc.yandex.ru/watch/${YANDEX_METRICA_ID}`}
                        style={{ position: 'absolute', left: '-9999px' }}
                        alt=""
                    />
                </div>
            </noscript>
        </>
    );
}
