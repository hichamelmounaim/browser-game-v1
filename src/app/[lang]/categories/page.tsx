import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllGames, getAllCategories, getSiteSettings } from '@/lib/db';
import { getTranslation } from '@/lib/translations';
import Link from 'next/link';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  const settings = getSiteSettings();
  const t = getTranslation(lang);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gamecis.com';
  return {
    title: t.categoriesSeoTitle.replace('Gamecis.com', settings.site_name),
    description: t.categoriesSeoDescription.replace('Gamecis.com', settings.site_name),
    alternates: {
      canonical: `${baseUrl}/${lang}/categories`,
      languages: {
        en: `${baseUrl}/en/categories`,
        fr: `${baseUrl}/fr/categories`,
        es: `${baseUrl}/es/categories`,
        'x-default': `${baseUrl}/en/categories`,
      },
    },
  };
}

export default async function CategoriesPage({ params }: Props) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  const games = getAllGames();
  const categories = getAllCategories();
  const siteSettings = getSiteSettings();
  const t = getTranslation(lang);
  
  // Calculate game counts by category name
  const categoryCounts = games.reduce((acc: { [key: string]: number }, game) => {
    const cat = game.category || 'Uncategorized';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <Navbar siteSettings={siteSettings} lang={lang} />
      
      <main className="max-w-[1440px] mx-auto px-6 py-12 min-h-[70vh]">
        <header className="mb-12">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">{t.genres}</h1>
          <p className="text-on-surface-variant text-sm mt-2 font-medium">
            {t.browseFullCatalog}
          </p>
        </header>

        {categories.length === 0 ? (
          <div className="p-16 text-center text-on-surface-variant bg-surface-container rounded-2xl border border-outline-variant/10">
            No categories synced yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => {
              const count = categoryCounts[category.name] || 0;
              let catDisplayName = category.name;
              if (lang === 'fr' && category.seo_title_fr) {
                catDisplayName = category.seo_title_fr.split(' - ')[0].replace('Jeux de ', '');
              } else if (lang === 'es' && category.seo_title_es) {
                catDisplayName = category.seo_title_es.split(' - ')[0].replace('Juegos de ', '');
              }
              catDisplayName = catDisplayName.charAt(0).toUpperCase() + catDisplayName.slice(1);
              
              return (
                <Link key={category.id} href={`/${lang}/category/${category.slug}`} className="block group">
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-surface-container shadow-sm border border-outline-variant/10 hover:shadow-[6px_6px_0px_0px_rgba(0,92,172,0.3)] hover:border-primary/20 hover:scale-[1.02] transition-all duration-200 cursor-pointer active:scale-95">
                    
                    {/* Background Category Thumbnail */}
                    <img 
                      src={category.thumbnail || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600"} 
                      alt={category.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Dark overlay with dynamic contents */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
                      <h2 className="text-white font-headline-md text-headline-md font-bold mb-1 group-hover:text-primary-fixed-dim transition-colors">
                        {catDisplayName}
                      </h2>
                      <p className="text-neon-mint text-xs font-bold">
                        {count} {count === 1 ? 'Game' : 'Games'} {t.gamesAvailable.toLowerCase()}
                      </p>
                    </div>

                    {/* Glossy highlight effect on hover */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      <Footer siteSettings={siteSettings} lang={lang} />
    </>
  );
}
