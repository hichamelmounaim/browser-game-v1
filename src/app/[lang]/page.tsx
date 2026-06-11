import Navbar from '@/components/Navbar';
import HomeClient from '@/components/HomeClient';
import Footer from '@/components/Footer';
import { getAllGames, getAllCategories, getSiteSettings } from '@/lib/db';
import { getTranslation } from '@/lib/translations';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  const settings = getSiteSettings();
  const t = getTranslation(lang);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gamecis.com';

  return {
    title: t.seoTitle.replace('Gamecis.com', settings.site_name),
    description: t.seoDescription.replace('Gamecis.com', settings.site_name),
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        en: `${baseUrl}/en`,
        fr: `${baseUrl}/fr`,
        es: `${baseUrl}/es`,
        'x-default': `${baseUrl}/en`,
      },
    },
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  const games = getAllGames();
  const categories = getAllCategories();
  const siteSettings = getSiteSettings();

  return (
    <>
      <Navbar siteSettings={siteSettings} lang={lang} />
      <HomeClient games={games} categories={categories} siteSettings={siteSettings} lang={lang} />
      <Footer siteSettings={siteSettings} lang={lang} />
    </>
  );
}
