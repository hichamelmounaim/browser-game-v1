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
    en: `Terms of Service | ${settings.site_name}`,
    fr: `Conditions d'utilisation | ${settings.site_name}`,
    es: `Términos de servicio | ${settings.site_name}`,
  };

  const descriptions = {
    en: `Terms of Service for ${settings.site_name} - rules and guidelines for playing free browser games on our platform.`,
    fr: `Conditions d'utilisation de ${settings.site_name} - règles et directives pour jouer à des jeux gratuits sur notre plateforme.`,
    es: `Términos de servicio de ${settings.site_name} - reglas y pautas para jugar juegos gratuitos en nuestra plataforma.`,
  };

  return {
    title: titles[lang as "en" | "fr" | "es"] || titles.en,
    description: descriptions[lang as "en" | "fr" | "es"] || descriptions.en,
  };
}

export default async function TermsPage({ params }: Props) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || "en";
  const siteSettings = getSiteSettings();
  const t = getTranslation(lang);

  const content = {
    en: {
      heading: "Terms of Service",
      subheading: "Last updated: June 11, 2026",
      intro: `Welcome to ${siteSettings.site_name}! By accessing or using our website at https://gamecis.com, you agree to comply with and be bound by the following Terms of Service. If you do not agree with any part of these terms, please do not use our platform.`,
      block1Title: "1. Acceptance of Terms",
      block1Text: `These Terms of Service govern your access to and use of ${siteSettings.site_name}, including any content, games, functionality, and services offered on or through the site. By using the site, you accept and agree to be bound and abide by these Terms.`,
      block2Title: "2. Intellectual Property Rights",
      block2Text: "The games featured on our platform are the intellectual property of their respective developers or publishers. We host these games via official iframe integration or open-distribution packages. The design, layout, logo, custom graphics, and portal source code of our website are the exclusive property of Gamecis. You must not copy, reproduce, distribute, or modify any part of the site without our prior written consent.",
      block3Title: "3. User Conduct and Restrictions",
      block3Text: "You agree to use our website only for lawful purposes. You are strictly prohibited from: (a) Attempting to gain unauthorized access to or damage any parts of the site or servers; (b) Deploying bots, scripts, crawlers, or scrapers to copy content or games; (c) Injecting malicious code, viruses, or trojan horses; (d) Using the site in any way that violates applicable local or international laws.",
      block4Title: "4. Disclaimer of Warranties",
      block4Text: "Our platform and all games, content, and services are provided on an 'as is' and 'as available' basis, without any warranties of any kind, either express or implied. We do not warrant that the site will be uninterrupted, error-free, secure, or free of viruses or other harmful components.",
      block5Title: "5. Limitation of Liability",
      block5Text: "In no event shall Gamecis, its operators, employees, or partners be liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, the website, any websites linked to it, or any games or content on the site.",
      block6Title: "6. Changes to Terms",
      block6Text: "We reserve the right to revise and update these Terms of Service at any time at our sole discretion. All changes are effective immediately when we post them, and apply to all access to and use of the website thereafter."
    },
    fr: {
      heading: "Conditions d'utilisation",
      subheading: "Dernière mise à jour : 11 juin 2026",
      intro: `Bienvenue sur ${siteSettings.site_name} ! En accédant à notre site Web à l'adresse https://gamecis.com ou en l'utilisant, vous acceptez de vous conformer et d'être lié par les conditions d'utilisation suivantes. Si vous n'êtes pas d'accord avec une partie de ces conditions, veuillez ne pas utiliser notre plateforme.`,
      block1Title: "1. Acceptation des conditions",
      block1Text: `Ces conditions d'utilisation régissent votre accès et votre utilisation de ${siteSettings.site_name}, y compris tout contenu, jeu, fonctionnalité et service proposé sur ou via le site. En utilisant le site, vous acceptez d'être lié et de vous conformer à ces conditions.`,
      block2Title: "2. Droits de propriété intellectuelle",
      block2Text: "Les jeux présentés sur notre plateforme sont la propriété intellectuelle de leurs développeurs ou éditeurs respectifs. Nous hébergeons ces jeux via une intégration iframe officielle ou des packages de distribution ouverte. La conception, la mise en page, le logo, les graphiques personnalisés et le code source du portail de notre site Web sont la propriété exclusive de Gamecis. Vous ne devez copier, reproduire, distribuer ou modifier aucune partie du site sans notre consentement écrit préalable.",
      block3Title: "3. Conduite de l'utilisateur et restrictions",
      block3Text: "Vous acceptez d'utiliser notre site Web uniquement à des fins légales. Il vous est strictement interdit de : (a) Tenter d'obtenir un accès non autorisé à des parties du site ou à des serveurs, ou de les endommager ; (b) Déployer des bots, des scripts, des robots d'indexation ou des extracteurs pour copier du contenu ou des jeux ; (c) Injecter des codes malveillants, des virus ou des chevaux de Troie ; (d) Utiliser le site de toute manière qui enfreint les lois locales ou internationales applicables.",
      block4Title: "4. Exclusion de garanties",
      block4Text: "Notre plateforme et tous les jeux, contenus et services sont fournis « en l'état » et « selon disponibilité », sans aucune garantie d'aucune sorte, expresse ou implicite. Nous ne garantissons pas que le site sera ininterrompu, sans erreur, sécurisé ou exempt de virus ou d'autres composants nocifs.",
      block5Title: "5. Limitation de responsabilité",
      block5Text: "En aucun cas Gamecis, ses opérateurs, employés ou partenaires ne pourront être tenus responsables de dommages de toute nature, en vertu de toute théorie juridique, découlant de ou en relation avec votre utilisation ou votre incapacité à utiliser le site Web, tout site Web lié à celui-ci, ou tout jeu ou contenu sur le site.",
      block6Title: "6. Modifications des conditions",
      block6Text: "Nous nous réservons le droit de réviser et de mettre à jour ces conditions d'utilisation à tout moment et à notre seule discrétion. Toutes les modifications entrent en vigueur immédiatement dès que nous les publions et s'appliquent à tout accès et utilisation ultérieurs du site Web."
    },
    es: {
      heading: "Términos de servicio",
      subheading: "Última actualización: 11 de junio de 2026",
      intro: `¡Bienvenido a ${siteSettings.site_name}! Al acceder o utilizar nuestro sitio web en https://gamecis.com, usted acepta cumplir y estar sujeto a los siguientes Términos de servicio. Si no está de acuerdo con alguna parte de estos términos, no utilice nuestra plataforma.`,
      block1Title: "1. Aceptación de los Términos",
      block1Text: `Estos Términos de servicio rigen su acceso y uso de ${siteSettings.site_name}, incluido cualquier contenido, juego, funcionalidad y servicio ofrecido en el sitio o a través de él. Al utilizar el sitio, usted acepta y se compromete a cumplir estos Términos.`,
      block2Title: "2. Derechos de propiedad intelectual",
      block2Text: "Los juegos que se muestran en nuestra plataforma son propiedad intelectual de sus respectivos desarrolladores o editores. Alojamos estos juegos mediante integración oficial de iframe o paquetes de distribución abierta. El diseño, la estructura, el logotipo, los gráficos personalizados y el código fuente del portal de nuestro sitio web son propiedad exclusiva de Gamecis. No debe copiar, reproducir, distribuir ni modificar ninguna parte del sitio sin nuestro consentimiento previo por escrito.",
      block3Title: "3. Conducta del usuario y restricciones",
      block3Text: "Usted acepta utilizar nuestro sitio web únicamente para fines lícitos. Queda estrictamente prohibido: (a) Intentar obtener acceso no autorizado o dañar cualquier parte del sitio o de los servidores; (b) Implementar bots, scripts, rastreadores o scrapers para copiar contenido o juegos; (c) Inyectar código malicioso, virus o troyanos; (d) Utilizar el sitio de cualquier manera que viole las leyes locales o internacionales aplicables.",
      block4Title: "4. Descargo de responsabilidad de garantías",
      block4Text: "Nuestra plataforma y todos los juegos, contenidos y servicios se proporcionan 'tal cual' y 'según disponibilidad', sin garantías de ningún tipo, ya sean expresas o implícitas. No garantizamos que el sitio funcione de forma ininterrumpida, libre de errores, seguro o libre de virus u otros componentes dañinos.",
      block5Title: "5. Limitación de responsabilidad",
      block5Text: "En ningún caso Gamecis, sus operadores, empleados o socios serán responsables por daños de ningún tipo, bajo ninguna teoría legal, que surjan de o en conexión con su uso, o la imposibilidad de usar, el sitio web, cualquier sitio web vinculado a él, o cualquier juego o contenido en el sitio.",
      block6Title: "6. Cambios en los Términos",
      block6Text: "Nos reservamos el derecho de revisar y actualizar estos Términos de servicio en cualquier momento a nuestra entera discreción. Todos los cambios son efectivos inmediatamente cuando los publicamos y se aplican a todo el acceso y uso del sitio web a partir de ese momento."
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
          <p className="text-teal-600 font-bold text-xs uppercase tracking-wider mb-8">
            {localizedContent.subheading}
          </p>

          <div className="prose prose-teal max-w-none space-y-6 text-gray-700 leading-relaxed text-xs md:text-sm">
            <p className="text-base text-gray-950 font-medium border-l-4 border-teal-500 pl-4 py-1 bg-teal-50/30">
              {localizedContent.intro}
            </p>

            <div className="space-y-2 pt-2">
              <h2 className="text-lg font-bold text-gray-950">{localizedContent.block1Title}</h2>
              <p>{localizedContent.block1Text}</p>
            </div>

            <div className="space-y-2 pt-2">
              <h2 className="text-lg font-bold text-gray-950">{localizedContent.block2Title}</h2>
              <p>{localizedContent.block2Text}</p>
            </div>

            <div className="space-y-2 pt-2">
              <h2 className="text-lg font-bold text-gray-950">{localizedContent.block3Title}</h2>
              <p>{localizedContent.block3Text}</p>
            </div>

            <div className="space-y-2 pt-2">
              <h2 className="text-lg font-bold text-gray-950">{localizedContent.block4Title}</h2>
              <p>{localizedContent.block4Text}</p>
            </div>

            <div className="space-y-2 pt-2">
              <h2 className="text-lg font-bold text-gray-950">{localizedContent.block5Title}</h2>
              <p>{localizedContent.block5Text}</p>
            </div>

            <div className="space-y-2 pt-2">
              <h2 className="text-lg font-bold text-gray-950">{localizedContent.block6Title}</h2>
              <p>{localizedContent.block6Text}</p>
            </div>
          </div>
        </main>
      </div>

      <Footer siteSettings={siteSettings} lang={lang} />
    </div>
  );
}
