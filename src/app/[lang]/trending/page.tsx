import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';
import { getAllGames, getSiteSettings } from '@/lib/db';
import { getTranslation } from '@/lib/translations';
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
    title: t.trendingSeoTitle.replace('Gamecis.com', settings.site_name),
    description: t.trendingSeoDescription.replace('Gamecis.com', settings.site_name),
    alternates: {
      canonical: `${baseUrl}/${lang}/trending`,
      languages: {
        en: `${baseUrl}/en/trending`,
        fr: `${baseUrl}/fr/trending`,
        es: `${baseUrl}/es/trending`,
        'x-default': `${baseUrl}/en/trending`,
      },
    },
  };
}

export default async function TrendingGamesPage({ params }: Props) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  const games = getAllGames();
  const siteSettings = getSiteSettings();
  const t = getTranslation(lang);
  
  // Sort games by rating DESC
  const trendingGames = [...games].sort((a, b) => b.rating - a.rating);

  return (
    <>
      <Navbar siteSettings={siteSettings} lang={lang} />
      
      <main className="max-w-[1440px] mx-auto px-6 py-12 min-h-[70vh]">
        <header className="mb-12">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">{t.popularThisWeek}</h1>
          <p className="text-on-surface-variant text-sm mt-2 font-medium">
            {lang === 'fr' ? 'Les jeux les plus populaires et les mieux notés par les joueurs cette semaine.' : lang === 'es' ? 'Los juegos más populares y mejor calificados elegidos por los jugadores esta semana.' : 'The most popular, highly-rated games chosen by players this week.'}
          </p>
        </header>

        {trendingGames.length === 0 ? (
          <div className="p-16 text-center text-on-surface-variant bg-surface-container rounded-2xl border border-outline-variant/10">
            No games found.
          </div>
        ) : (
          <div className="bento-grid">
            {trendingGames.map((game) => (
              <GameCard 
                key={game.id} 
                id={game.slug}
                title={game.title} 
                title_fr={game.title_fr}
                title_es={game.title_es}
                category={game.category} 
                thumbnail={game.thumbnail} 
                rating={game.rating} 
                lang={lang}
              />
            ))}
          </div>
        )}
      </main>

      <Footer siteSettings={siteSettings} lang={lang} />
    </>
  );
}
