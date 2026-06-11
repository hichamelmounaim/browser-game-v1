"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { getTranslation } from '@/lib/translations';

interface GameItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
}

interface CategoryItem {
  id: string;
  name: string;
  seo_title_fr?: string;
  seo_title_es?: string;
}

export default function Navbar({ siteSettings, lang = 'en' }: { siteSettings?: { site_name: string; site_logo: string }; lang?: string }) {
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const [games, setGames] = useState<GameItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const t = getTranslation(lang);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];
  const currentLanguage = languages.find(l => l.code === lang) || languages[0];

  const handleLanguageChange = (newLang: string) => {
    // Segment paths
    const segments = pathname.split('/');
    if (segments.length > 1 && ['en', 'fr', 'es'].includes(segments[1])) {
      segments[1] = newLang;
    } else {
      segments.unshift(newLang);
    }
    const newPath = segments.join('/') || '/';
    // Trigger routing change via window.location.assign (without violating strict direct href mutation rules if checked)
    window.location.assign(newPath);
  };

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchFocus = async () => {
    if (games.length === 0) {
      try {
        const res = await fetch('/api/games');
        const data = await res.json();
        if (data.success && data.games) {
          setGames(data.games);
        }
      } catch (err) {
        console.error('Failed to load games for search', err);
      }
    }
    setShowResults(true);
  };

  // Fetch categories for nav links dynamically
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        if (data.success && data.categories) {
          setCategories(data.categories.filter((c: CategoryItem) => c.name).slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to load nav categories', err);
      }
    }
    loadCategories();
  }, []);

  const lowerQuery = query.toLowerCase();
  const filteredGames = lowerQuery
    ? games.filter(
        (game) =>
          game.title.toLowerCase().includes(lowerQuery) ||
          (game.category && game.category.toLowerCase().includes(lowerQuery))
      ).slice(0, 5)
    : [];

  // Helper to slugify category names consistently
  const getCategorySlug = (catName: string) => {
    return catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-black/5 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1440px] mx-auto w-full">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href={`/${lang}`} className="flex items-center gap-2 font-headline-md text-headline-md font-black tracking-tighter text-primary" onClick={() => setMobileMenuOpen(false)}>
            {siteSettings?.site_logo ? (
              <img src={siteSettings.site_logo} alt={siteSettings.site_name} className="h-10 md:h-12 w-auto object-contain" />
            ) : (
              <span>{siteSettings?.site_name || 'gamecis'}</span>
            )}
          </Link>
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-6 font-label-bold text-[14px] font-bold items-center">
            <Link 
              href={`/${lang}/new`} 
              className={`pb-1 transition-colors ${
                pathname === `/${lang}/new` 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {t.newGames}
            </Link>
            
            {/* Dynamic category links */}
            {categories.map((cat) => {
              const slug = getCategorySlug(cat.name);
              const href = `/${lang}/category/${slug}`;
              const isActive = pathname === href;
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
                  href={href}
                  className={`pb-1 transition-all duration-200 hover:scale-105 ${
                    isActive
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {catDisplayName}
                </Link>
              );
            })}

            <Link 
              href={`/${lang}/categories`} 
              className={`pb-1 transition-colors ${
                pathname === `/${lang}/categories` 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {t.allGenres}
            </Link>
          </div>
        </div>

        {/* Right Search Input & User Controls */}
        <div className="flex items-center gap-4">
          
          {/* Search container in Navbar */}
          <div ref={containerRef} className="relative hidden sm:block w-48 md:w-64">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-xl">search</span>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={handleSearchFocus}
                className="w-full h-9 pl-9 pr-8 rounded-full bg-surface-container-low text-on-surface border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs shadow-sm"
              />
              {query && (
                <button 
                  onClick={() => setQuery('')}
                  className="absolute right-3 text-on-surface-variant hover:text-on-surface text-lg font-bold"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Results Floating Dropdown */}
            {showResults && (query || filteredGames.length > 0) && (
              <div className="absolute top-full right-0 left-0 mt-2 max-h-[300px] overflow-y-auto z-[1000] p-2 rounded-xl bg-surface-white border border-outline-variant/50 shadow-lg scrollbar-hide">
                {filteredGames.length > 0 ? (
                  filteredGames.map((game) => (
                    <Link
                      key={game.id}
                      href={`/${lang}/game/${game.slug}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container transition-all"
                      onClick={() => {
                        setShowResults(false);
                        setQuery('');
                      }}
                    >
                      <img src={game.thumbnail} alt={game.title} className="w-10 h-10 object-cover rounded-md border" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-on-surface">{game.title}</span>
                        <span className="text-[10px] text-primary">{game.category}</span>
                      </div>
                    </Link>
                  ))
                ) : query ? (
                  <div className="p-3 text-center text-xs text-on-surface-variant">No games found for &quot;{query}&quot;</div>
                ) : (
                  <div className="p-3 text-center text-xs text-on-surface-variant">Type to search catalog...</div>
                )}
              </div>
            )}
          </div>

          <button className="material-symbols-outlined text-primary p-2 rounded-full hover:bg-surface-container transition-colors sm:hidden" onClick={() => setMobileMenuOpen(true)}>search</button>

          {/* Dynamic Language Switcher */}
          <div ref={langRef} className="relative">
            <button 
              className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-surface-container transition-all text-xs font-bold border border-outline-variant/30 text-on-surface"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            >
              <span>{currentLanguage.flag}</span>
              <span className="uppercase">{currentLanguage.code}</span>
              <span className="material-symbols-outlined text-[16px] select-none">arrow_drop_down</span>
            </button>
            
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-xl bg-surface-white border border-outline-variant/50 shadow-lg p-1 z-50">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      handleLanguageChange(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg text-left transition-colors ${
                      l.code === lang 
                        ? 'bg-primary/10 text-primary font-bold' 
                        : 'text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="material-symbols-outlined text-primary p-2 rounded-full hover:bg-surface-container transition-colors" title="Account">account_circle</button>

          {/* Mobile menu toggle */}
          <button 
            className="material-symbols-outlined text-primary p-2 rounded-full hover:bg-surface-container transition-colors md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            menu
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden flex justify-end" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-[280px] h-full bg-surface-white p-6 flex flex-col gap-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <span className="font-headline-md text-primary font-black tracking-tighter">NAVIGATION</span>
              <button className="material-symbols-outlined text-on-surface" onClick={() => setMobileMenuOpen(false)}>close</button>
            </div>
            
            {/* Mobile Search input */}
            <div className="relative flex items-center w-full">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-xl">search</span>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={handleSearchFocus}
                className="w-full h-10 pl-10 pr-8 rounded-xl bg-surface-container text-on-surface border-none focus:ring-2 focus:ring-primary text-sm shadow-sm"
              />
            </div>

            <nav className="flex flex-col gap-4 font-label-bold text-body-md mt-4">
              <Link href={`/${lang}`} className="text-on-surface hover:text-primary py-2 border-b border-black/5" onClick={() => setMobileMenuOpen(false)}>{t.home}</Link>
              <Link href={`/${lang}/new`} className="text-on-surface hover:text-primary py-2 border-b border-black/5" onClick={() => setMobileMenuOpen(false)}>{t.newGames}</Link>
              <Link href={`/${lang}/categories`} className="text-on-surface hover:text-primary py-2 border-b border-black/5" onClick={() => setMobileMenuOpen(false)}>{t.allGenres}</Link>
              
              <div className="text-[12px] uppercase text-on-surface-variant font-extrabold tracking-widest mt-4">Top Genres</div>
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
                    className="text-on-surface-variant hover:text-primary py-1 pl-2 text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {catDisplayName}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}
