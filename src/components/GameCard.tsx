import Link from 'next/link';

interface GameCardProps {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  rating?: number;
  lang?: string;
  title_fr?: string;
  title_es?: string;
}

const categoryTranslations: Record<string, Record<string, string>> = {
  fr: {
    'Uncategorized': 'Sans catégorie',
    'Arcade': 'Arcade',
    'Sports': 'Sports',
    'Simulation': 'Simulation',
    'Casual': 'Occasionnel',
    'Puzzle': 'Puzzle',
    'Action': 'Action',
    'Racing': 'Course'
  },
  es: {
    'Uncategorized': 'Sin categoría',
    'Arcade': 'Arcade',
    'Sports': 'Deportes',
    'Simulation': 'Simulación',
    'Casual': 'Casual',
    'Puzzle': 'Puzle',
    'Action': 'Acción',
    'Racing': 'Carreras'
  }
};

export default function GameCard({ id, title, thumbnail, category, rating = 4.5, lang = 'en', title_fr, title_es }: GameCardProps) {
  let displayTitle = title;
  if (lang === 'fr') {
    displayTitle = title_fr || displayTitle;
  } else if (lang === 'es') {
    displayTitle = title_es || displayTitle;
  }

  const displayCategory = categoryTranslations[lang]?.[category] || category;

  return (
    <Link href={`/${lang}/game/${id}`} className="block group">
      <article className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-container shadow-sm border border-outline-variant/10 hover:shadow-[6px_6px_0px_0px_rgba(0,92,172,0.3)] hover:border-primary/20 hover:scale-[1.02] transition-all duration-200 cursor-pointer active:scale-95">
        
        {/* Thumbnail Image */}
        <img 
          src={thumbnail} 
          alt={`${displayTitle} thumbnail`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          loading="lazy" 
        />
        
        {/* Bottom Text Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/55 to-transparent flex flex-col justify-end">
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-neon-mint mb-0.5">
            {displayCategory}
          </span>
          <h3 className="text-white text-sm font-bold truncate leading-tight group-hover:text-primary-fixed-dim transition-colors">
            {displayTitle}
          </h3>
          <div className="flex justify-between items-center mt-1 text-[10px] text-gray-300">
            <span>⭐ {rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Hover Highlight Overlay */}
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
      </article>
    </Link>
  );
}
