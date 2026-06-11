import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { getSiteSettings } from "@/lib/db";
import { getTranslation } from "@/lib/translations";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const settings = getSiteSettings();
  const t = getTranslation(lang);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gamecis.com";

  const verification: any = {};
  if (settings.google_verification_id) {
    verification.google = settings.google_verification_id;
  }
  if (settings.yandex_verification_id) {
    verification.yandex = settings.yandex_verification_id;
  }
  if (settings.bing_verification_id) {
    verification.other = {
      'msvalidate.01': settings.bing_verification_id,
    };
  }

  return {
    metadataBase: new URL(baseUrl),
    title: t.seoTitle.replace('Gamecis.com', settings.site_name),
    description: t.seoDescription.replace('Gamecis.com', settings.site_name),
    verification,
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || "en";
  const settings = getSiteSettings();
  
  return (
    <html lang={lang} className={plusJakarta.variable}>
      <head>
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
        />
      </head>
      <body className="bg-background text-on-surface font-body-md min-h-screen">
        {settings.google_analytics_id && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics_id}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${settings.google_analytics_id}');
              `}
            </Script>
          </>
        )}
        {settings.google_adsense_id && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.google_adsense_id}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        {children}
      </body>
    </html>
  );
}
