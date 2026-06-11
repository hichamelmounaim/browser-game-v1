"use client";

import { useState } from 'react';
import Link from 'next/link';
import GameCard from './GameCard';

import { Game, Category } from '@/lib/db';

interface HomeClientProps {
  games: Game[];
  categories: Category[];
  siteSettings?: { site_name: string; site_logo: string };
  lang?: string;
}

import { getTranslation } from '@/lib/translations';

export default function HomeClient({ games, categories, siteSettings, lang = 'en' }: HomeClientProps) {
  const [query, setQuery] = useState('');
  const t = getTranslation(lang);

  const lowerQuery = query.toLowerCase();
  const filteredGames = lowerQuery
    ? games.filter(
        (game) =>
          game.title.toLowerCase().includes(lowerQuery) ||
          (game.category && game.category.toLowerCase().includes(lowerQuery))
      ).slice(0, 6)
    : [];

  // Group games by category for the showcase sections
  const getGamesByCategory = (catName: string) => {
    return games.filter(g => g.category === catName).slice(0, 6);
  };

  // Get trending games (sorted by rating)
  const trendingGames = [...games].sort((a, b) => b.rating - a.rating).slice(0, 6);

  // Helper to slugify category names
  const getCategorySlug = (catName: string) => {
    return catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  return (
    <main className="max-w-[1440px] mx-auto pb-16 text-left">
      
      {/* Hero Section */}
      <section className="px-6 pt-12 pb-8">
        <div className="relative overflow-hidden rounded-2xl bg-primary p-8 md:p-16 text-center shadow-lg border border-primary/20">
          
          {/* Bento Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="grid grid-cols-6 gap-4 transform -rotate-12 scale-150">
              <div className="w-full h-32 bg-white rounded-lg"></div>
              <div className="w-full h-32 bg-white rounded-lg"></div>
              <div className="w-full h-32 bg-white rounded-lg"></div>
              <div className="w-full h-32 bg-white rounded-lg"></div>
              <div className="w-full h-32 bg-white rounded-lg"></div>
              <div className="w-full h-32 bg-white rounded-lg"></div>
            </div>
          </div>

          <div className="relative z-10">
            <h1 className="font-headline-xl text-[32px] md:text-[48px] font-black tracking-tight mb-6 text-white leading-none">
              {t.whatAreYouPlaying}
            </h1>
            
            {/* Search Input Box */}
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full h-14 pl-14 pr-6 rounded-xl bg-surface-white text-on-surface border-none focus:ring-4 focus:ring-secondary-fixed-dim/30 text-[18px] shadow-sm focus:outline-none"
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-3xl">
                search
              </span>
              
              {/* Floating Instant Search Results in Hero */}
              {query && (
                <div className="absolute top-full left-0 right-0 mt-2 z-30 p-2 rounded-xl bg-surface-white border border-outline-variant/60 shadow-xl max-h-[350px] overflow-y-auto text-left">
                  {filteredGames.length > 0 ? (
                    filteredGames.map((game) => (
                      <Link
                        key={game.id}
                        href={`/${lang}/game/${game.slug}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container transition-all"
                      >
                        <img src={game.thumbnail} alt={lang === 'fr' ? game.title_fr || game.title : lang === 'es' ? game.title_es || game.title : game.title} className="w-12 h-12 object-cover rounded-md border" />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-on-surface">{lang === 'fr' ? game.title_fr || game.title : lang === 'es' ? game.title_es || game.title : game.title}</span>
                          <span className="text-xs text-primary">{game.category}</span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-on-surface-variant">
                      No games found matching &quot;{query}&quot;
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Category Tags */}
            <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
              {categories.map((cat) => {
                let catDisplayName = cat.name;
                if (lang === 'fr' && cat.seo_title_fr) {
                  catDisplayName = cat.seo_title_fr.split(' - ')[0].replace('Jeux de ', '');
                } else if (lang === 'es' && cat.seo_title_es) {
                  catDisplayName = cat.seo_title_es.split(' - ')[0].replace('Juegos de ', '');
                }
                catDisplayName = catDisplayName.charAt(0).toUpperCase() + catDisplayName.slice(1);

                return (
                  <Link
                    key={cat.id}
                    href={`/${lang}/category/${getCategorySlug(cat.name)}`}
                    className="px-4 py-2 bg-surface-white/10 hover:bg-surface-white/20 text-white rounded-full text-[14px] font-bold cursor-pointer hover:scale-105 transition-all duration-200"
                  >
                    {catDisplayName}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Popular This Week (Bento Grid) */}
      <section className="px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-headline-lg text-headline-lg flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-secondary-fixed-dim fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            {t.popularThisWeek}
          </h2>
          <Link href={`/${lang}/trending`} className="text-primary font-bold hover:underline text-sm">
            {t.viewAll}
          </Link>
        </div>
        
        {games.length === 0 ? (
          <div className="p-12 text-center text-on-surface-variant bg-surface-container rounded-2xl border border-outline-variant/10">
            {t.noGames}
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
      </section>

      {/* Dynamic Category Showcase Sections */}
      {categories.filter(c => c.name !== 'Uncategorized').map((cat) => {
        const catGames = getGamesByCategory(cat.name);
        if (catGames.length === 0) return null; // Hide empty categories on home
        
        let catDisplayName = cat.name;
        if (lang === 'fr' && cat.seo_title_fr) {
          catDisplayName = cat.seo_title_fr.split(' - ')[0].replace('Jeux de ', '');
        } else if (lang === 'es' && cat.seo_title_es) {
          catDisplayName = cat.seo_title_es.split(' - ')[0].replace('Juegos de ', '');
        }
        catDisplayName = catDisplayName.charAt(0).toUpperCase() + catDisplayName.slice(1);

        return (
          <section key={cat.id} className="px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                {catDisplayName} {t.gamesAvailable.split(' ')[0]}
              </h2>
              <Link href={`/${lang}/category/${getCategorySlug(cat.name)}`} className="text-primary font-bold hover:underline text-sm">
                {t.viewAll}
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {catGames.map((game) => {
                const gameTitle = lang === 'fr' ? game.title_fr || game.title : lang === 'es' ? game.title_es || game.title : game.title;
                return (
                  <Link key={game.id} href={`/${lang}/game/${game.slug}`} className="group cursor-pointer block">
                    <div className="aspect-square rounded-xl overflow-hidden mb-2 shadow-sm border border-outline-variant/10 group-hover:scale-105 group-hover:shadow-[4px_4px_0px_0px_rgba(0,92,172,0.3)] transition-all duration-200">
                      <img className="w-full h-full object-cover" src={game.thumbnail} alt={gameTitle} />
                    </div>
                    <p className="font-bold text-xs truncate text-on-surface group-hover:text-primary transition-colors mt-1">
                      {gameTitle}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* SEO Section */}
      <section className="px-6 py-12 max-w-4xl mx-auto text-center border-t border-outline-variant/20 mt-12">
        <h2 className="font-headline-lg text-headline-lg mb-6 text-on-surface">
          {t.seoBlockTitle.replace('Gamecis.com', siteSettings?.site_name || 'gamecis')}
        </h2>
        <div className="text-on-surface-variant space-y-4 leading-relaxed text-sm">
          <p>
            {t.seoBlockP1.replace('Gamecis.com', siteSettings?.site_name || 'gamecis')}
          </p>
          <p>
            {t.seoBlockP2.replace('Gamecis.com', siteSettings?.site_name || 'gamecis')}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/10">
              <h4 className="font-extrabold text-lg text-primary">1500+</h4>
              <p className="text-xs text-on-surface-variant mt-1">{t.freeGames}</p>
            </div>
            <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/10">
              <h4 className="font-extrabold text-lg text-primary">Instant</h4>
              <p className="text-xs text-on-surface-variant mt-1">{t.noDownload}</p>
            </div>
            <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/10">
              <h4 className="font-extrabold text-lg text-primary">Responsive</h4>
              <p className="text-xs text-on-surface-variant mt-1">{t.responsive}</p>
            </div>
            <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/10">
              <h4 className="font-extrabold text-lg text-primary">Global</h4>
              <p className="text-xs text-on-surface-variant mt-1">{t.global}</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
