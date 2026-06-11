import { getGameBySlug, getAllGames, getSiteSettings } from '@/lib/db';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GamePlayer from '@/components/GamePlayer';
import { getTranslation } from '@/lib/translations';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string; lang: string }>;
};

// Generate dynamic SEO metadata based on the game and language in the database
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  const game = getGameBySlug(resolvedParams.slug);
  const settings = getSiteSettings();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gamecis.com';

  if (!game) {
    return {
      title: `Game Not Found | ${settings.site_name}`,
    };
  }

  let title = game.title;
  let description = game.description;
  let keywords = game.seo_keywords;
  if (lang === 'fr') {
    title = game.title_fr || title;
    description = game.description_fr || description;
    keywords = game.seo_keywords_fr || keywords;
  } else if (lang === 'es') {
    title = game.title_es || title;
    description = game.description_es || description;
    keywords = game.seo_keywords_es || keywords;
  }

  return {
    title: `${title} | Play Free on ${settings.site_name}`,
    description: description || `Play ${title} for free online. No downloads required.`,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      images: [game.thumbnail],
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/game/${resolvedParams.slug}`,
      languages: {
        en: `${baseUrl}/en/game/${resolvedParams.slug}`,
        fr: `${baseUrl}/fr/game/${resolvedParams.slug}`,
        es: `${baseUrl}/es/game/${resolvedParams.slug}`,
        'x-default': `${baseUrl}/en/game/${resolvedParams.slug}`,
      },
    },
  };
}

export async function generateStaticParams() {
  const games = getAllGames();
  const locales = ['en', 'fr', 'es'];
  const params: { slug: string; lang: string }[] = [];
  
  for (const locale of locales) {
    for (const game of games) {
      params.push({ slug: game.slug, lang: locale });
    }
  }
  return params;
}

export default async function GamePage({ params }: Props) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  const game = getGameBySlug(resolvedParams.slug);
  const siteSettings = getSiteSettings();
  const t = getTranslation(lang);

  if (!game) {
    notFound();
  }

  // Get slugified category link
  const getCategorySlug = (catName: string) => {
    return catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  let description = game.description;
  if (lang === 'fr') {
    description = game.description_fr || description;
  } else if (lang === 'es') {
    description = game.description_es || description;
  }

  const displayTitle = lang === 'fr' ? game.title_fr || game.title : lang === 'es' ? game.title_es || game.title : game.title;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gamecis.com';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoGame",
            "name": displayTitle,
            "description": description || `Play ${displayTitle} online for free on ${siteSettings.site_name}.`,
            "image": game.thumbnail,
            "url": `${baseUrl}/${lang}/game/${game.slug}`,
            "genre": game.category,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": game.rating || 4.5,
              "bestRating": "5",
              "worstRating": "1",
              "ratingCount": Math.max(15, Math.round((game.rating || 4.5) * 35))
            }
          })
        }}
      />
      <Navbar siteSettings={siteSettings} lang={lang} />
      
      <main className="max-w-[1440px] mx-auto px-6 py-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link href={`/${lang}`} className="text-primary font-bold text-xs hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">chevron_left</span> {t.backToCatalog}
          </Link>
        </div>

        {/* Responsive layout: Main content on left, sidebar on right */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Main Area */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Game Screen Player */}
            <GamePlayer 
              iframeUrl={game.iframe_url} 
              title={displayTitle} 
              thumbnail={game.thumbnail} 
            />
            
            {/* Game Info Panel */}
            <div className="bg-surface-white border border-outline-variant/10 rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 pb-6 border-b border-outline-variant/20">
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-on-surface mb-2 leading-none">
                    {displayTitle}
                  </h1>
                  <Link 
                    href={`/${lang}/category/${getCategorySlug(game.category || 'Uncategorized')}`} 
                    className="inline-block bg-primary-container/15 text-primary text-xs font-bold px-3 py-1.5 rounded-full hover:bg-primary-container/25 transition-all"
                  >
                    {game.category || 'Uncategorized'}
                  </Link>
                </div>
                
                <div className="flex items-center gap-4 flex-wrap text-sm">
                  <span className="text-secondary-fixed-dim font-bold text-lg flex items-center gap-1">
                    ★ {game.rating.toFixed(1)}
                  </span>
                  <button className="flex items-center gap-1 px-4 py-2 border border-outline-variant/40 rounded-xl text-xs font-bold hover:bg-surface-container transition-all">
                    ❤️ {t.favorite}
                  </button>
                  <button className="flex items-center gap-1 px-4 py-2 border border-outline-variant/40 rounded-xl text-xs font-bold hover:bg-surface-container transition-all">
                    ⤴️ {t.share}
                  </button>
                </div>
              </div>

              {/* Game About Description */}
              <div className="prose prose-sm max-w-none text-on-surface-variant font-medium leading-relaxed">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-bold text-on-surface m-0">{t.about} {displayTitle}</h3>
                  {game.description_source === 'poki' && (
                    <span className="inline-flex items-center bg-surface-container-high text-on-surface-variant text-[10px] font-bold px-2.5 py-1 rounded-md border border-outline-variant/30 select-none">
                      🏷️ {t.descriptionFromPoki}
                    </span>
                  )}
                </div>
                <p className="whitespace-pre-line">{description || 'No description available for this game.'}</p>
              </div>
            </div>

          </div>
          
          {/* Sidebar Area */}
          <aside className="lg:col-span-1 bg-surface-white border border-outline-variant/10 rounded-2xl p-6 flex flex-col gap-6 shadow-sm min-h-[400px]">
            <div className="text-center">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-on-surface-variant">
                {t.advertisement}
              </span>
              <div className="w-full h-64 bg-surface-container-high rounded-xl border border-dashed border-outline-variant/60 flex items-center justify-center text-on-surface-variant/40 font-bold text-sm tracking-wider mt-3">
                {t.adSpace}
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-bold text-xs uppercase tracking-widest text-on-surface-variant mb-4">{t.relatedCategories}</h4>
              <div className="flex flex-wrap gap-2">
                <Link href={`/${lang}/category/arcade`} className="text-xs font-bold px-3 py-1.5 bg-surface-container rounded-lg hover:bg-primary-container hover:text-white transition-colors">Arcade</Link>
                <Link href={`/${lang}/category/action`} className="text-xs font-bold px-3 py-1.5 bg-surface-container rounded-lg hover:bg-primary-container hover:text-white transition-colors">Action</Link>
                <Link href={`/${lang}/categories`} className="text-xs font-bold px-3 py-1.5 bg-surface-container rounded-lg hover:bg-primary-container hover:text-white transition-colors">{t.allGenres}</Link>
              </div>
            </div>
          </aside>
          
        </div>
      </main>

      <Footer siteSettings={siteSettings} lang={lang} />
    </>
  );
}
