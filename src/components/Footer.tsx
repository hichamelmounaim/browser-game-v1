import Link from 'next/link';

export default function Footer({ siteSettings, lang = 'en' }: { siteSettings?: { site_name: string; site_logo: string }; lang?: string }) {
  const brandName = siteSettings?.site_name || 'Gamecis';
  return (
    <footer className="bg-surface-container-highest w-full mt-12 border-t border-black/5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-12 max-w-[1440px] mx-auto">
        
        {/* Brand Info */}
        <div className="flex flex-col gap-4 text-left">
          <span className="flex items-center gap-2 font-headline-md text-headline-md font-black text-primary">
            {siteSettings?.site_logo ? (
              <img src={siteSettings.site_logo} alt={brandName} className="h-10 md:h-12 w-auto object-contain" />
            ) : (
              <span>{brandName}</span>
            )}
          </span>
          <p className="text-on-surface-variant text-sm font-medium">
            {lang === 'fr' 
              ? "L'arcade de jeux en ligne gratuits avec la croissance la plus rapide au monde. Rejoignez des millions de joueurs dès aujourd'hui !" 
              : lang === 'es' 
              ? "El salón de juegos en línea gratis de más rápido crecimiento en el mundo. ¡Únete a millones de jugadores hoy!" 
              : "The world's fastest growing free online gaming arcade. Join millions of players today!"}
          </p>
        </div>

        {/* Column 1: Games */}
        <div className="flex flex-col gap-4 text-left md:pl-8">
          <h4 className="font-bold text-primary text-sm">{lang === 'fr' ? 'Jeux populaires' : lang === 'es' ? 'Juegos populares' : 'Popular Games'}</h4>
          <nav className="flex flex-col gap-2 text-xs text-on-surface-variant font-medium">
            <Link className="hover:text-tertiary transition-colors" href={`/${lang}/new`}>{lang === 'fr' ? 'Nouveaux jeux' : lang === 'es' ? 'Juegos nuevos' : 'New Games'}</Link>
            <Link className="hover:text-tertiary transition-colors" href={`/${lang}/trending`}>{lang === 'fr' ? 'Jeux populaires' : lang === 'es' ? 'Juegos populares' : 'Popular Games'}</Link>
            <Link className="hover:text-tertiary transition-colors" href={`/${lang}/category/arcade`}>{lang === 'fr' ? 'Jeux d\'arcade' : lang === 'es' ? 'Juegos de arcade' : 'Arcade Games'}</Link>
            <Link className="hover:text-tertiary transition-colors" href={`/${lang}/category/action`}>{lang === 'fr' ? 'Jeux d\'action' : lang === 'es' ? 'Juegos de acción' : 'Action Games'}</Link>
          </nav>
        </div>

        {/* Column 2: Legal & Trust */}
        <div className="flex flex-col gap-4 text-left md:pl-8">
          <h4 className="font-bold text-primary text-sm">{lang === 'fr' ? 'Entreprise' : lang === 'es' ? 'Compañía' : 'Company'}</h4>
          <nav className="flex flex-col gap-2 text-xs text-on-surface-variant font-medium">
            <Link className="hover:text-tertiary transition-colors" href={`/${lang}/about`}>{lang === 'fr' ? 'À propos' : lang === 'es' ? 'Nosotros' : 'About Us'}</Link>
            <Link className="hover:text-tertiary transition-colors" href={`/${lang}/terms`}>{lang === 'fr' ? 'Conditions d\'utilisation' : lang === 'es' ? 'Términos de servicio' : 'Terms of Service'}</Link>
            <Link className="hover:text-tertiary transition-colors" href={`/${lang}/privacy`}>{lang === 'fr' ? 'Politique de confidentialité' : lang === 'es' ? 'Política de privacidad' : 'Privacy Policy'}</Link>
            <Link className="hover:text-tertiary transition-colors" href={`/${lang}/contact`}>{lang === 'fr' ? 'Contact' : lang === 'es' ? 'Contacto' : 'Contact Support'}</Link>
          </nav>
        </div>

      </div>

      <div className="px-6 py-6 border-t border-black/5 text-center text-xs text-on-surface-variant font-bold">
        © 2026 {brandName} Arcade. All rights reserved.
      </div>
    </footer>
  );
}
