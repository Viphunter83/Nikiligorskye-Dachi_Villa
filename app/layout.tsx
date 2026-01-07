import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CookieConsent } from "@/components/ui/CookieConsent";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn(inter.variable, playfair.variable, "bg-background min-h-screen")} suppressHydrationWarning>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
