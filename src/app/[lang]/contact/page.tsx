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
    en: `Contact Us | ${settings.site_name}`,
    fr: `Contactez-nous | ${settings.site_name}`,
    es: `Contáctenos | ${settings.site_name}`,
  };

  const descriptions = {
    en: `Get in touch with the support team of ${settings.site_name} for questions, feedback, or business inquiries.`,
    fr: `Contactez l'équipe d'assistance de ${settings.site_name} pour vos questions, commentaires ou demandes commerciales.`,
    es: `Póngase en contacto con el equipo de soporte de ${settings.site_name} para preguntas, comentarios o consultas comerciales.`,
  };

  return {
    title: titles[lang as "en" | "fr" | "es"] || titles.en,
    description: descriptions[lang as "en" | "fr" | "es"] || descriptions.en,
  };
}

export default async function ContactPage({ params }: Props) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || "en";
  const siteSettings = getSiteSettings();
  const t = getTranslation(lang);

  const content = {
    en: {
      heading: "Contact Support",
      subheading: "We are here to help",
      intro: `Have questions about ${siteSettings.site_name}? Want to submit your own game, report a bug, or inquire about business opportunities? Feel free to reach out to us! Our support team is active and ready to assist you.`,
      emailTitle: "Direct Email Inquiry",
      emailText: "For all support, business, DMCA notifications, and game submissions, please send an email directly to our official mailbox:",
      emailAddr: "support@gamecis.com",
      responseTitle: "Response Turnaround",
      responseText: "We value your inquiries and strive to reply as quickly as possible. Generally, you can expect a detailed response from our support representatives within 24 to 48 business hours.",
      gameSubTitle: "Are you a developer?",
      gameSubText: `We are always looking for fresh, fun, and high-quality browser games to feature on ${siteSettings.site_name}! If you want to showcase your game to millions of active players, please send your game build or iframe link along with a brief description and promotional materials to our support email.`,
      safetyTitle: "Report Abuse or Broken Games",
      safetyText: "Player safety and enjoyment are our top priorities. If you encounter any game that is broken, shows inappropriate content, or infringes on copyrights, please report it immediately to our support email so that we can investigate and take swift action."
    },
    fr: {
      heading: "Contactez le support",
      subheading: "Nous sommes là pour vous aider",
      intro: `Vous avez des questions sur ${siteSettings.site_name} ? Vous souhaitez soumettre votre propre jeu, signaler un bug ou vous renseigner sur des opportunités commerciales ? N'hésitez pas à nous contacter ! Notre équipe d'assistance est active et prête à vous aider.`,
      emailTitle: "Demande par e-mail direct",
      emailText: "Pour toute assistance, demande commerciale, notification DMCA et soumission de jeux, veuillez envoyer un e-mail directement à notre boîte aux lettres officielle :",
      emailAddr: "support@gamecis.com",
      responseTitle: "Délai de réponse",
      responseText: "Nous accordons une grande importance à vos demandes et nous nous efforçons d'y répondre le plus rapidement possible. En règle générale, vous pouvez vous attendre à une réponse détaillée de nos représentants du support dans un délai de 24 à 48 heures ouvrables.",
      gameSubTitle: "Êtes-vous un développeur ?",
      gameSubText: `Nous sommes toujours à la recherche de nouveaux jeux sur navigateur, amusants et de haute qualité pour les présenter sur ${siteSettings.site_name} ! Si vous souhaitez présenter votre jeu à des millions de joueurs actifs, veuillez envoyer votre build de jeu ou votre lien iframe accompagné d'une brève description et de matériel promotionnel à notre e-mail d'assistance.`,
      safetyTitle: "Signaler un abus ou des jeux en panne",
      safetyText: "La sécurité et le plaisir des joueurs sont nos priorités absolues. Si vous rencontrez un jeu qui ne fonctionne pas, affiche un contenu inapproprié ou enfreint les droits d'auteur, veuillez le signaler immédiatement à notre e-mail d'assistance afin que nous puissions enquêter et prendre des mesures rapides."
    },
    es: {
      heading: "Contactar Soporte",
      subheading: "Estamos aquí para ayudarte",
      intro: `¿Tiene preguntas sobre ${siteSettings.site_name}? ¿Desea enviar su propio juego, informar de un error o preguntar sobre oportunidades comerciales? ¡No dude en contactarnos! Nuestro equipo de soporte está activo y listo para ayudarle.`,
      emailTitle: "Consulta directa por correo electrónico",
      emailText: "Para cualquier tipo de soporte, consultas comerciales, notificaciones de DMCA y envío de juegos, envíe un correo electrónico directamente a nuestro buzón oficial:",
      emailAddr: "support@gamecis.com",
      responseTitle: "Tiempo de respuesta",
      responseText: "Valoramos sus consultas y nos esforzamos por responder lo antes posible. Por lo general, puede esperar una respuesta detallada de nuestros representantes de soporte dentro de las 24 a 48 horas hábiles.",
      gameSubTitle: "¿Eres un desarrollador?",
      gameSubText: `¡Siempre estamos buscando juegos de navegador frescos, divertidos y de alta calidad para presentarlos en ${siteSettings.site_name}! Si desea mostrar su juego a millones de jugadores activos, envíe el enlace de su juego o iframe junto con una breve descripción y materiales promocionales a nuestro correo electrónico de soporte.`,
      safetyTitle: "Informar de abusos o juegos rotos",
      safetyText: "La seguridad y el disfrute de los jugadores son nuestras principales prioridades. Si encuentra algún juego que no funciona, muestra contenido inapropiado o infringe los derechos de autor, infórmelo de inmediato a nuestro correo de soporte para que podamos investigar y tomar medidas rápidas."
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

          <div className="prose prose-teal max-w-none space-y-8 text-gray-700 leading-relaxed text-sm md:text-base">
            <p className="text-base text-gray-950 font-medium border-l-4 border-teal-500 pl-4 py-1 bg-teal-50/30">
              {localizedContent.intro}
            </p>

            <div className="bg-teal-500/5 p-6 rounded-2xl border border-teal-500/10 flex flex-col items-center text-center">
              <h2 className="text-xl font-bold text-teal-900 mb-2">{localizedContent.emailTitle}</h2>
              <p className="text-sm text-gray-600 max-w-lg mb-4">{localizedContent.emailText}</p>
              <a 
                href={`mailto:${localizedContent.emailAddr}`} 
                className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-lg md:text-xl px-8 py-3 rounded-full shadow transition-all hover:scale-105"
              >
                📬 {localizedContent.emailAddr}
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-1">{localizedContent.responseTitle}</h3>
                <p className="text-xs md:text-sm text-gray-600">{localizedContent.responseText}</p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-1">{localizedContent.safetyTitle}</h3>
                <p className="text-xs md:text-sm text-gray-600">{localizedContent.safetyText}</p>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">{localizedContent.gameSubTitle}</h3>
              <p className="text-xs md:text-sm text-gray-600">{localizedContent.gameSubText}</p>
            </div>
          </div>
        </main>
      </div>

      <Footer siteSettings={siteSettings} lang={lang} />
    </div>
  );
}
