import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/db";
import { getTranslation } from "@/lib/translations";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || "en";
  const settings = getSiteSettings();
  
  const titles = {
    en: `About Us | ${settings.site_name}`,
    fr: `À propos de nous | ${settings.site_name}`,
    es: `Sobre nosotros | ${settings.site_name}`,
  };

  const descriptions = {
    en: `Learn more about ${settings.site_name}, the fastest growing free online browser games platform.`,
    fr: `En savoir plus sur ${settings.site_name}, la plateforme de jeux par navigateur gratuits à la croissance la plus rapide.`,
    es: `Obtén más información sobre ${settings.site_name}, la plataforma de juegos de navegador gratuitos de más rápido crecimiento.`,
  };

  return {
    title: titles[lang as "en" | "fr" | "es"] || titles.en,
    description: descriptions[lang as "en" | "fr" | "es"] || descriptions.en,
  };
}

export default async function AboutPage({ params }: Props) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || "en";
  const siteSettings = getSiteSettings();
  const t = getTranslation(lang);

  const content = {
    en: {
      heading: "About Gamecis",
      subheading: "Your Ultimate Playground for Free Browser Games",
      intro: `Welcome to ${siteSettings.site_name}! We are a premier online gaming platform dedicated to bringing you the absolute best collection of free-to-play browser games from around the world. Our mission is simple: to make gaming instantly accessible, completely free, and incredibly fun for players of all ages, everywhere.`,
      block1Title: "Who We Are",
      block1Text: `${siteSettings.site_name} is a curation of high-quality HTML5 browser games. We believe that playing games shouldn't require expensive hardware, complex installations, or long waiting times. That's why every single game on our platform is playable instantly in your standard web browser. Whether you are on a desktop PC, a mobile phone, or a tablet, our games are fully optimized to run smoothly on any screen.`,
      block2Title: "Our Curated Collection",
      block2Text: "We host a massive variety of genres to ensure there is something for every gamer. From multiplayer action, high-octane racing, and strategic puzzles, to casual arcade games and sports simulators. Our editing team carefully reviews, tests, and rates each game to guarantee a safe, stable, and highly entertaining experience for our community.",
      block3Title: "No Downloads, No Installations",
      block3Text: "All of our games run directly inside your web browser. This means you do not need to download potentially harmful files, install plugins, or register for accounts unless you want to save your in-game progress. Just click and play instantly!",
      trustTitle: "Why Millions Choose Gamecis",
      trustItem1: "100% Free: No subscriptions, hidden costs, or paywalls.",
      trustItem2: "Cross-Platform: Play on mobile, desktop, or tablet seamlessly.",
      trustItem3: "Safe & Secure: All games are verified to be safe from malware and secure to play."
    },
    fr: {
      heading: "À propos de Gamecis",
      subheading: "Votre terrain de jeu ultime pour les jeux gratuits sur navigateur",
      intro: `Bienvenue sur ${siteSettings.site_name} ! Nous sommes une plateforme de jeux en ligne de premier plan dédiée à vous offrir la meilleure collection de jeux sur navigateur gratuits du monde entier. Notre mission est simple : rendre le jeu instantanément accessible, entièrement gratuit et incroyablement amusant pour les joueurs de tous âges, partout dans le monde.`,
      block1Title: "Qui sommes-nous ?",
      block1Text: `${siteSettings.site_name} est une sélection de jeux HTML5 de haute qualité sur navigateur. Nous pensons que jouer ne devrait pas nécessiter de matériel coûteux, d'installations complexes ou de longs temps d'attente. C'est pourquoi chaque jeu sur notre plateforme est jouable instantanément dans votre navigateur Web standard. Que vous soyez sur un PC de bureau, un téléphone mobile ou une tablette, nos jeux sont entièrement optimisés pour fonctionner de manière fluide sur n'importe quel écran.`,
      block2Title: "Notre collection sélectionnée",
      block2Text: "Nous hébergeons une grande variété de genres pour garantir qu'il y en a pour tous les joueurs. De l'action multijoueur, de la course à sensations fortes et des puzzles stratégiques, aux jeux d'arcade occasionnels et aux simulateurs sportifs. Notre équipe éditoriale examine, teste et note soigneusement chaque jeu afin de garantir une expérience sûre, stable et hautement divertissante pour notre communauté.",
      block3Title: "Sans téléchargement, sans installation",
      block3Text: "Tous nos jeux s'exécutent directement dans votre navigateur Web. Cela signifie que vous n'avez pas besoin de télécharger des fichiers potentiellement dangereux, d'installer des plug-ins ou de vous inscrire à des comptes, sauf si vous souhaitez enregistrer votre progression dans le jeu. Cliquez et jouez instantanément !",
      trustTitle: "Pourquoi des millions de joueurs choisissent Gamecis",
      trustItem1: "100% Gratuit : Pas d'abonnements, de coûts cachés ou de barrières payantes.",
      trustItem2: "Multiplateforme : Jouez sur mobile, ordinateur ou tablette de manière transparente.",
      trustItem3: "Sûr et sécurisé : Tous les jeux sont vérifiés pour être exempts de logiciels malveillants et sûrs à jouer."
    },
    es: {
      heading: "Sobre Gamecis",
      subheading: "Tu patio de recreo definitivo para juegos de navegador gratis",
      intro: `¡Bienvenido a ${siteSettings.site_name}! Somos una plataforma de juegos en línea dedicada a ofrecerte la mejor colección de juegos de navegador gratuitos de todo el mundo. Nuestra misión es simple: hacer que el juego sea instantáneamente accesible, completamente gratuito e increíblemente divertido para jugadores de todas las edades, en cualquier lugar.`,
      block1Title: "¿Quiénes somos?",
      block1Text: `${siteSettings.site_name} es una selección de juegos HTML5 de navegador de alta calidad. Creemos que jugar no debería requerir hardware costoso, instalaciones complejas ni largos tiempos de espera. Es por eso que cada juego en nuestra plataforma se puede jugar al instante en tu navegador web estándar. Ya sea que estés en una PC de escritorio, un teléfono móvil o una tableta, nuestros juegos están completamente optimizados para funcionar sin problemas en cualquier pantalla.`,
      block2Title: "Nuestra colección seleccionada",
      block2Text: "Ofrecemos una gran variedad de géneros para garantizar que haya algo para cada jugador. Desde acción multijugador, carreras de alta velocidad y acertijos estratégicos, hasta juegos de arcade casuales y simuladores deportivos. Nuestro equipo editorial revisa, prueba y califica cuidadosamente cada juego para garantizar una experiencia segura, estable y altamente entretenida para nuestra comunidad.",
      block3Title: "Sin descargas, sin instalaciones",
      block3Text: "Todos nuestros juegos se ejecutan directamente dentro de tu navegador web. Esto significa que no necesitas descargar archivos potencialmente dañinos, instalar complementos ni registrarte para obtener cuentas a menos que desees guardar tu progreso en el juego. ¡Simplemente haz clic y juega al instante!",
      trustTitle: "Por qué millones eligen Gamecis",
      trustItem1: "100% Gratis: Sin suscripciones, costes ocultos ni muros de pago.",
      trustItem2: "Multiplataforma: Juega en móvil, computadora o tableta sin problemas.",
      trustItem3: "Seguro y protegido: Todos los juegos están verificados para ser seguros frente a malware y protegidos para jugar."
    }
  };

  const localizedContent = content[lang as "en" | "fr" | "es"] || content.en;

  return (
    <div className="poki-lowpoly min-h-screen flex flex-col justify-between">
      <div>
        <Navbar siteSettings={siteSettings} lang={lang} />
        
        <main className="max-w-[800px] mx-auto px-6 py-12 text-left bg-white/95 backdrop-blur-md rounded-3xl border border-white shadow-sm mt-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            {localizedContent.heading}
          </h1>
          <p className="text-teal-600 font-bold text-sm uppercase tracking-wider mb-8">
            {localizedContent.subheading}
          </p>

          <div className="prose prose-teal max-w-none space-y-6 text-gray-700 leading-relaxed text-sm md:text-base">
            <p className="font-semibold text-gray-950 text-base md:text-lg border-l-4 border-teal-500 pl-4 py-1 bg-teal-50/30">
              {localizedContent.intro}
            </p>

            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-2">{localizedContent.block1Title}</h2>
              <p>{localizedContent.block1Text}</p>
            </div>

            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-2">{localizedContent.block2Title}</h2>
              <p>{localizedContent.block2Text}</p>
            </div>

            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-2">{localizedContent.block3Title}</h2>
              <p>{localizedContent.block3Text}</p>
            </div>

            <div className="space-y-4 pt-6 bg-teal-500/5 p-6 rounded-2xl border border-teal-500/10">
              <h2 className="text-lg font-bold text-teal-900 mb-3">{localizedContent.trustTitle}</h2>
              <ul className="list-disc pl-5 space-y-2 font-medium text-teal-950">
                <li>{localizedContent.trustItem1}</li>
                <li>{localizedContent.trustItem2}</li>
                <li>{localizedContent.trustItem3}</li>
              </ul>
            </div>
          </div>
        </main>
      </div>

      <Footer siteSettings={siteSettings} lang={lang} />
    </div>
  );
}
