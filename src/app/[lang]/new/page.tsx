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
    title: t.newSeoTitle.replace('Gamecis.com', settings.site_name),
    description: t.newSeoDescription.replace('Gamecis.com', settings.site_name),
    alternates: {
      canonical: `${baseUrl}/${lang}/new`,
      languages: {
        en: `${baseUrl}/en/new`,
        fr: `${baseUrl}/fr/new`,
        es: `${baseUrl}/es/new`,
        'x-default': `${baseUrl}/en/new`,
      },
    },
  };
}

export default async function NewGamesPage({ params }: Props) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  const games = getAllGames();
  const siteSettings = getSiteSettings();
  const t = getTranslation(lang);
  
  // Sort games by created_at DESC
  const newGames = [...games].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <>
      <Navbar siteSettings={siteSettings} lang={lang} />
      
      <main className="max-w-[1440px] mx-auto px-6 py-12 min-h-[70vh]">
        <header className="mb-12">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">{t.newGames}</h1>
          <p className="text-on-surface-variant text-sm mt-2 font-medium">
            {lang === 'fr' ? 'Nouveaux jeux fraîchement ajoutés. Jouez-y en premier !' : lang === 'es' ? 'Juegos nuevos recién añadidos. ¡Pruébalos primero!' : 'Fresh games hot off the press. Play them first!'}
          </p>
        </header>

        {newGames.length === 0 ? (
          <div className="p-16 text-center text-on-surface-variant bg-surface-container rounded-2xl border border-outline-variant/10">
            No games added yet. Scrape some games using the Controller CMS!
          </div>
        ) : (
          <div className="bento-grid">
            {newGames.map((game) => (
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
