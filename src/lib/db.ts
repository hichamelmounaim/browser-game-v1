import fs from 'fs';
import path from 'path';

export interface Game {
  id: string;
  title: string;
  title_fr?: string;
  title_es?: string;
  slug: string;
  description: string;
  description_fr?: string;
  description_es?: string;
  thumbnail: string;
  category: string;
  source_url: string;
  iframe_url: string;
  seo_keywords: string;
  seo_keywords_fr?: string;
  seo_keywords_es?: string;
  rating: number;
  description_source?: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  seo_title: string;
  seo_title_fr?: string;
  seo_title_es?: string;
  seo_description: string;
  seo_description_fr?: string;
  seo_description_es?: string;
  seo_keywords: string;
  seo_keywords_fr?: string;
  seo_keywords_es?: string;
  content_unit?: string;
  content_unit_fr?: string;
  content_unit_es?: string;
  created_at?: string;
}

export function getAllGames(): Game[] {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'games.json');
    if (!fs.existsSync(dataPath)) return [];
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(fileContents) as Game[];
  } catch (error) {
    console.error('Failed to load games from JSON:', error);
    return [];
  }
}

export function getGameBySlug(slug: string): Game | undefined {
  const games = getAllGames();
  return games.find((g) => g.slug === slug);
}

// Category Helpers
export function getAllCategories(): Category[] {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'categories.json');
    if (fs.existsSync(dataPath)) {
      const fileContents = fs.readFileSync(dataPath, 'utf8');
      return JSON.parse(fileContents) as Category[];
    }
  } catch (error) {
    console.error('Failed to load categories from JSON:', error);
  }

  // Fallback: Extract categories dynamically from games
  const games = getAllGames();
  const settings = getSiteSettings();
  const catNames = Array.from(new Set(games.map(g => g.category || 'Uncategorized')));
  return catNames.map((name, i) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return {
      id: `fallback-${i}`,
      name,
      slug,
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=60',
      seo_title: `${name} Games - Play Free Online | ${settings.site_name}`,
      seo_description: `Play the best free online ${name.toLowerCase()} games. No downloads required, play directly in your browser.`,
      seo_keywords: `${name.toLowerCase()}, free games, browser games`,
      content_unit: `<h3>Play the Best Free Online ${name} Games</h3><p>Welcome to ${settings.site_name}, the home of the best ${name.toLowerCase()} games online!</p>`
    };
  });
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const categories = getAllCategories();
  return categories.find((c) => c.slug === slug);
}

export interface SiteSettings {
  site_name: string;
  site_logo: string;
  google_analytics_id?: string;
  google_adsense_id?: string;
  google_verification_id?: string;
  yandex_verification_id?: string;
  bing_verification_id?: string;
}

export function getSiteSettings(): SiteSettings {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'settings.json');
    if (fs.existsSync(dataPath)) {
      const fileContents = fs.readFileSync(dataPath, 'utf8');
      return JSON.parse(fileContents) as SiteSettings;
    }
  } catch (error) {
    console.error('Failed to load settings from JSON:', error);
  }
  return {
    site_name: 'ULTI GRAVITY',
    site_logo: ''
  };
}
