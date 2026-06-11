import { NextResponse } from "next/server";
import { getAllGames, getAllCategories } from "@/lib/db";

export const revalidate = 3600;

const URLS_PER_SITEMAP = 2000;
const LOCALES_COUNT = 3;
const ITEMS_PER_SITEMAP = Math.floor(URLS_PER_SITEMAP / LOCALES_COUNT); // 666 items per sitemap file

export async function GET() {
  const gamesCount = getAllGames().length;
  const categoriesCount = getAllCategories().length;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gamecis.com";

  const categoriesSitemapCount = Math.ceil(categoriesCount / ITEMS_PER_SITEMAP) || 1;
  const gamesSitemapCount = Math.ceil(gamesCount / ITEMS_PER_SITEMAP) || 1;

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Pages
  xml += `  <sitemap>\n`;
  xml += `    <loc>${baseUrl}/sitemap/pages.xml</loc>\n`;
  xml += `  </sitemap>\n`;

  // Categories
  for (let i = 0; i < categoriesSitemapCount; i++) {
    xml += `  <sitemap>\n`;
    xml += `    <loc>${baseUrl}/sitemap/categories-${i}.xml</loc>\n`;
    xml += `  </sitemap>\n`;
  }

  // Games
  for (let i = 0; i < gamesSitemapCount; i++) {
    xml += `  <sitemap>\n`;
    xml += `    <loc>${baseUrl}/sitemap/games-${i}.xml</loc>\n`;
    xml += `  </sitemap>\n`;
  }

  xml += `</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
