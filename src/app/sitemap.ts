import type { MetadataRoute } from "next";
import { getAllGames, getAllCategories } from "@/lib/db";

export default function sitemap(): MetadataRoute.Sitemap {
  const games = getAllGames();
  const categories = getAllCategories();
  const locales = ["en", "fr", "es"];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gamecis.com";

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Helper to generate alternates for languages
  const getAlternates = (path: string) => {
    return {
      languages: {
        en: `${baseUrl}/en${path}`,
        fr: `${baseUrl}/fr${path}`,
        es: `${baseUrl}/es${path}`,
        "x-default": `${baseUrl}/en${path}`,
      },
    };
  };

  // 1. Home / Root page alternates and entries
  for (const lang of locales) {
    sitemapEntries.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
      alternates: getAlternates(""),
    });
  }

  // 2. Static pages: categories, new, trending
  for (const lang of locales) {
    sitemapEntries.push({
      url: `${baseUrl}/${lang}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: getAlternates("/categories"),
    });
    sitemapEntries.push({
      url: `${baseUrl}/${lang}/new`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
      alternates: getAlternates("/new"),
    });
    sitemapEntries.push({
      url: `${baseUrl}/${lang}/trending`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
      alternates: getAlternates("/trending"),
    });
  }

  // 3. Category pages
  for (const lang of locales) {
    for (const category of categories) {
      if (!category.slug) continue;
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
        alternates: getAlternates(`/category/${category.slug}`),
      });
    }
  }

  // 4. Game pages
  for (const lang of locales) {
    for (const game of games) {
      if (!game.slug) continue;
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/game/${game.slug}`,
        lastModified: game.created_at ? new Date(game.created_at) : new Date(),
        changeFrequency: "daily",
        priority: 0.8,
        alternates: getAlternates(`/game/${game.slug}`),
      });
    }
  }

  return sitemapEntries;
}
