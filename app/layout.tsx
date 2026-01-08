import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { YandexMetrica } from "@/components/analytics/YandexMetrica";
import { getHouseProfile } from "@/lib/actions";
import PersonaProvider from "@/components/providers/PersonaProvider";
import { HOUSE_DATA, PersonaContent, PersonaType } from "@/data/house-data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Residence Nikologorskie Dachi | Private Offering",
  description: "A Lloyd Wright inspired estate. 746 sqm of private luxury.",
  metadataBase: new URL('https://nikologorskaya-villa.info'),
  openGraph: {
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Residence Nikologorskie Dachi',
      },
    ],
  },
  verification: {
    yandex: '764933977e433ad7',
    google: 'eJTC5ErlD1rn2fQMDpgZKvL0qLN9EK-qmHIEFPlGpig',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const house = await getHouseProfile();

  // Robust fallback: DB -> File -> Empty (should never happen)
  const initialData = (house?.cms_data as unknown as Record<PersonaType, PersonaContent>) || HOUSE_DATA.Content;

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn(inter.variable, playfair.variable, "bg-background min-h-screen")} suppressHydrationWarning>
        <PersonaProvider initialData={initialData}>
          {children}
        </PersonaProvider>
        <CookieConsent />
        <YandexMetrica />
      </body>
    </html>
  );
}
