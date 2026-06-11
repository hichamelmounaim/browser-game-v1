import Link from 'next/link';
import { getAllCategories, getAllGames, getSiteSettings } from '@/lib/db';
import { getTranslation } from '@/lib/translations';

export default function SitemapPage({ params: { lang } }: { params: { lang: string } }) {
  const games = getAllGames();
  const categories = getAllCategories();
  const siteSettings = getSiteSettings();
  const t = getTranslation(lang);

  const getCategorySlug = (catName: string) => {
    return catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  return (
    <main className="max-w-[1440px] mx-auto pb-16 px-6 pt-12 text-left">
      <h1 className="font-headline-xl text-[32px] md:text-[48px] font-black tracking-tight mb-8 text-on-surface">
        {t.allGenres || 'HTML Sitemap'} - {siteSettings.site_name}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-headline-lg text-2xl font-bold mb-4 text-primary">Main Pages</h2>
          <ul className="space-y-2 list-disc list-inside text-on-surface-variant">
            <li><Link href={`/${lang}`} className="hover:text-primary hover:underline">{t.home || 'Home'}</Link></li>
            <li><Link href={`/${lang}/new`} className="hover:text-primary hover:underline">{t.newGames || 'New Games'}</Link></li>
            <li><Link href={`/${lang}/trending`} className="hover:text-primary hover:underline">Trending Games</Link></li>
            <li><Link href={`/${lang}/categories`} className="hover:text-primary hover:underline">{t.allGenres || 'Categories'}</Link></li>
            <li><Link href={`/sitemap.xml`} className="hover:text-primary hover:underline text-secondary-fixed">XML Sitemap (SEO)</Link></li>
          </ul>

          <h2 className="font-headline-lg text-2xl font-bold mb-4 mt-8 text-primary">Categories</h2>
          <ul className="space-y-2 list-disc list-inside text-on-surface-variant">
            {categories.map(cat => {
              let catDisplayName = cat.name;
              if (lang === 'fr' && cat.seo_title_fr) {
                catDisplayName = cat.seo_title_fr.split(' - ')[0].replace('Jeux de ', '');
              } else if (lang === 'es' && cat.seo_title_es) {
                catDisplayName = cat.seo_title_es.split(' - ')[0].replace('Juegos de ', '');
              }
              return (
                <li key={cat.id}>
                  <Link href={`/${lang}/category/${getCategorySlug(cat.name)}`} className="hover:text-primary hover:underline">
                    {catDisplayName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        
        <div>
          <h2 className="font-headline-lg text-2xl font-bold mb-4 text-primary">All Games</h2>
          <ul className="space-y-2 list-disc list-inside text-on-surface-variant max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
            {games.map(game => {
              const gameTitle = lang === 'fr' ? game.title_fr || game.title : lang === 'es' ? game.title_es || game.title : game.title;
              return (
                <li key={game.id}>
                  <Link href={`/${lang}/game/${game.slug}`} className="hover:text-primary hover:underline text-sm">
                    {gameTitle}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
