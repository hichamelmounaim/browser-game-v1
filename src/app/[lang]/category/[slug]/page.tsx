import { getAllGames, getCategoryBySlug, getSiteSettings } from '@/lib/db';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';
import { getTranslation } from '@/lib/translations';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string; lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  const category = getCategoryBySlug(resolvedParams.slug);
  const settings = getSiteSettings();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gamecis.com';

  if (!category) {
    return {
      title: `Category Not Found | ${settings.site_name}`,
    };
  }

  let title = category.seo_title;
  let description = category.seo_description;
  let keywords = category.seo_keywords;

  if (lang === 'fr') {
    title = category.seo_title_fr || title;
    description = category.seo_description_fr || description;
    keywords = category.seo_keywords_fr || keywords;
  } else if (lang === 'es') {
    title = category.seo_title_es || title;
    description = category.seo_description_es || description;
    keywords = category.seo_keywords_es || keywords;
  }

  return {
    title: title || `${category.name} Games - Play Free Online | ${settings.site_name}`,
    description: description || `Play the best free online ${category.name.toLowerCase()} games. No downloads required.`,
    keywords: keywords || `${category.name.toLowerCase()}, free games, browser games`,
    openGraph: {
      title: title,
      description: description,
      images: [category.thumbnail],
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/category/${resolvedParams.slug}`,
      languages: {
        en: `${baseUrl}/en/category/${resolvedParams.slug}`,
        fr: `${baseUrl}/fr/category/${resolvedParams.slug}`,
        es: `${baseUrl}/es/category/${resolvedParams.slug}`,
        'x-default': `${baseUrl}/en/category/${resolvedParams.slug}`,
      },
    },
  };
}

export async function generateStaticParams() {
  const games = getAllGames();
  const slugs = Array.from(new Set(games.map(g => {
    return (g.category || 'Uncategorized').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  })));
  
  const locales = ['en', 'fr', 'es'];
  const params: { slug: string; lang: string }[] = [];
  
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ slug, lang: locale });
    }
  }
  return params;
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  const category = getCategoryBySlug(resolvedParams.slug);
  const siteSettings = getSiteSettings();
  const t = getTranslation(lang);

  if (!category) {
    notFound();
  }

  const games = getAllGames();
  const categoryGames = games.filter(
    (g) =>
      (g.category || 'Uncategorized').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ===
      resolvedParams.slug
  );

  // Compute popular games table
  const popularGames = [...categoryGames]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 10);

  const categoryThumbnail = category.thumbnail || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=60';

  // Localized variables
  let categoryName = category.name;
  let seoDesc = category.seo_description;
  let cu = category.content_unit;

  if (lang === 'fr') {
    if (category.seo_title_fr) {
      categoryName = category.seo_title_fr.split(' - ')[0].replace('Jeux de ', '');
    }
    seoDesc = category.seo_description_fr || seoDesc;
    cu = category.content_unit_fr || cu;
  } else if (lang === 'es') {
    if (category.seo_title_es) {
      categoryName = category.seo_title_es.split(' - ')[0].replace('Juegos de ', '');
    }
    seoDesc = category.seo_description_es || seoDesc;
    cu = category.content_unit_es || cu;
  }
  categoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <div className="poki-lowpoly min-h-screen flex flex-col justify-between">
      <div>
        <Navbar siteSettings={siteSettings} lang={lang} />
        
        <main className="max-w-[1200px] mx-auto px-4 py-8">
          
          {/* Navigation Breadcrumbs */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-600 font-medium bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full w-fit border border-white/20">
            <Link href={`/${lang}`} className="hover:text-teal-600 transition-colors flex items-center">
              <span className="material-symbols-outlined text-base mr-1">home</span> {t.home}
            </Link>
            <span className="material-symbols-outlined text-xs text-gray-400">chevron_right</span>
            <span className="text-gray-900 font-bold">{categoryName} {t.gamesAvailable.split(' ')[0]}</span>
          </div>

          {/* Category Header (Poki Style Card) */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="max-w-2xl text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                {categoryName} {t.gamesAvailable.split(' ')[0]}
              </h1>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {seoDesc || `${t.descriptionFallback.replace('Gamecis.com', siteSettings.site_name)}`}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {categoryGames.length} {categoryGames.length === 1 ? 'Game' : 'Games'}
                </span>
                <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  100% {t.freeGames.split(' ')[1] || 'Free'}
                </span>
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {t.noDownload}
                </span>
              </div>
            </div>
            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-teal-50 rounded-2xl overflow-hidden border-2 border-white shadow-inner flex items-center justify-center">
              <img 
                src={categoryThumbnail} 
                alt={categoryName} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Games Grid inside a clean container */}
          {categoryGames.length === 0 ? (
            <div className="p-16 text-center text-gray-500 bg-white/80 backdrop-blur-md rounded-3xl border border-white">
              No games found in this category.
            </div>
          ) : (
            <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-inner">
              <div className="bento-grid">
                {categoryGames.map((game) => (
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
            </div>
          )}

          {/* Copywriting Unit & Popular Games Table */}
          {categoryGames.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-teal-900/10 text-left">
              {/* Copywriting Unit Block */}
              <div className="md:col-span-2 space-y-6 rich-text-cu bg-white/85 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white shadow-sm">
                {cu ? (
                  <div dangerouslySetInnerHTML={{ __html: cu }} />
                ) : (
                  <div>
                    <h3>Play Free Online {categoryName} Games</h3>
                    <p>Enjoy the ultimate collection of free online {categoryName.toLowerCase()} games at {siteSettings.site_name}. Play these games in your web browser instantly on desktop, mobile, or tablet devices.</p>
                  </div>
                )}
              </div>

              {/* Popular Games List (Poki style table) */}
              <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm h-fit">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-teal-600">trending_up</span>
                  {t.popularTableTitle} - {categoryName}
                </h3>
                <div className="overflow-hidden rounded-2xl border border-teal-50">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-teal-500/10 text-teal-900 border-b border-teal-50">
                        <th className="p-3 font-semibold">{t.gameCol}</th>
                        <th className="p-3 font-semibold text-right w-20">{t.ratingCol}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-teal-50/50 bg-white">
                      {popularGames.map((game, index) => (
                        <tr key={game.id} className="hover:bg-teal-50/50 transition-colors">
                          <td className="p-3 font-medium text-gray-800">
                            <Link href={`/${lang}/game/${game.slug}`} className="hover:text-teal-600 flex items-center gap-2">
                              <span className="text-xs font-mono text-gray-400">#{index + 1}</span>
                              <span className="truncate max-w-[150px]">{game.title}</span>
                            </Link>
                          </td>
                          <td className="p-3 text-right text-gray-500 font-medium">
                            ⭐ {game.rating?.toFixed(1) || "4.5"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer siteSettings={siteSettings} lang={lang} />
    </div>
  );
}
