import { NextResponse } from "next/server";
import { getAllGames, getAllCategories } from "@/lib/db";

export const revalidate = 3600;

const URLS_PER_SITEMAP = 2000;
const LOCALES_COUNT = 3;
const ITEMS_PER_SITEMAP = Math.floor(URLS_PER_SITEMAP / LOCALES_COUNT); // 666 items per sitemap file

// Helper to escape XML special characters
function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export async function GET(request: Request, { params }: { params: Promise<{ type: string }> }) {
  const resolvedParams = await params;
  const type = resolvedParams.type.replace('.xml', '');
  const games = getAllGames();
  const categories = getAllCategories();
  const locales = ["en", "fr", "es"];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gamecis.com";

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  const addUrl = (path: string, lastMod: string, changeFreq: string, priority: string) => {
    const escapedPath = escapeXml(path);
    for (const lang of locales) {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/${lang}${escapedPath}</loc>\n`;
      for (const altLang of locales) {
        xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${baseUrl}/${altLang}${escapedPath}" />\n`;
      }
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en${escapedPath}" />\n`;
      xml += `    <lastmod>${lastMod}</lastmod>\n`;
      xml += `    <changefreq>${changeFreq}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;
      xml += `  </url>\n`;
    }
  };

  const today = new Date().toISOString();

  if (type === 'pages') {
    // Root
    addUrl('', today, 'daily', '1.0');
    // Static pages
    addUrl('/categories', today, 'weekly', '0.8');
    addUrl('/new', today, 'daily', '0.9');
    addUrl('/trending', today, 'daily', '0.9');
  } else if (type.startsWith('categories-')) {
    const pageIndex = parseInt(type.replace('categories-', ''), 10);
    const start = pageIndex * ITEMS_PER_SITEMAP;
    const end = start + ITEMS_PER_SITEMAP;
    const paginatedCategories = categories.slice(start, end);

    for (const category of paginatedCategories) {
      if (!category.slug) continue;
      addUrl(`/category/${category.slug}`, today, 'daily', '0.8');
    }
  } else if (type.startsWith('games-')) {
    const pageIndex = parseInt(type.replace('games-', ''), 10);
    const start = pageIndex * ITEMS_PER_SITEMAP;
    const end = start + ITEMS_PER_SITEMAP;
    const paginatedGames = games.slice(start, end);

    for (const game of paginatedGames) {
      if (!game.slug) continue;
      const gameDate = game.created_at ? new Date(game.created_at).toISOString() : today;
      addUrl(`/game/${game.slug}`, gameDate, 'daily', '0.8');
    }
  } else {
    return new NextResponse("Not Found", { status: 404 });
  }

  xml += `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
