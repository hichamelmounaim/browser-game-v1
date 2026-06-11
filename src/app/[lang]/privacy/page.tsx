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
    en: `Privacy Policy | ${settings.site_name}`,
    fr: `Politique de confidentialité | ${settings.site_name}`,
    es: `Política de privacidad | ${settings.site_name}`,
  };

  const descriptions = {
    en: `Privacy Policy for ${settings.site_name} - details on cookies, user data protection, and AdSense advertising guidelines.`,
    fr: `Politique de confidentialité de ${settings.site_name} - détails sur les cookies, la protection des données et les règles publicitaires AdSense.`,
    es: `Política de privacidad de ${settings.site_name} - detalles sobre cookies, protección de datos y políticas publicitarias de AdSense.`,
  };

  return {
    title: titles[lang as "en" | "fr" | "es"] || titles.en,
    description: descriptions[lang as "en" | "fr" | "es"] || descriptions.en,
  };
}

export default async function PrivacyPage({ params }: Props) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || "en";
  const siteSettings = getSiteSettings();
  const t = getTranslation(lang);

  const content = {
    en: {
      heading: "Privacy Policy",
      subheading: "Last updated: June 11, 2026",
      consentTitle: "1. Consent",
      consentText: `By using our website ${siteSettings.site_name} (accessible from https://gamecis.com), you hereby consent to our Privacy Policy and agree to its terms.`,
      infoColTitle: "2. Information We Collect",
      infoColText: "The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information. If you contact us directly, we may receive additional information about you such as your name, email address, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.",
      cookiesTitle: "3. Log Files and Cookies",
      cookiesText: `${siteSettings.site_name} follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information. Like any other website, we use 'cookies' to store information including visitors' preferences and the pages on the website that the visitor accessed or visited.`,
      adsenseTitle: "4. Google DoubleClick DART Cookie",
      adsenseText: "Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – https://policies.google.com/technologies/ads",
      partnersTitle: "5. Third-Party Advertising Partners",
      partnersText: "Some of the advertisers on our site may use cookies and web beacons. Our advertising partners include Google AdSense. Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on our platform, which are sent directly to users' browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit. Note that we have no access to or control over these cookies that are used by third-party advertisers.",
      thirdPartyTitle: "6. Third Party Privacy Policies",
      thirdPartyText: "Our Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.",
      childrenTitle: "7. Children's Information (COPPA Compliance)",
      childrenText: "Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. We do not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records."
    },
    fr: {
      heading: "Politique de confidentialité",
      subheading: "Dernière mise à jour : 11 juin 2026",
      consentTitle: "1. Consentement",
      consentText: `En utilisant notre site Web ${siteSettings.site_name} (accessible depuis https://gamecis.com), vous consentez par la présente à notre politique de confidentialité et acceptez ses conditions.`,
      infoColTitle: "2. Informations que nous collectons",
      infoColText: "Les informations personnelles qu'on vous demande de fournir, ainsi que les raisons pour lesquelles on vous demande de les fournir, vous seront précisées au moment où nous vous demanderons de les fournir. Si vous nous contactez directement, nous pouvons recevoir des informations supplémentaires sur vous, telles que votre nom, votre adresse e-mail, le contenu du message et/ou des pièces jointes que vous pouvez nous envoyer, et toute autre information que vous pouvez choisir de fournir.",
      cookiesTitle: "3. Fichiers journaux et cookies",
      cookiesText: `${siteSettings.site_name} suit une procédure standard d'utilisation des fichiers journaux (log files). Ces fichiers enregistrent les visiteurs lorsqu'ils visitent des sites Web. Les informations collectées par les fichiers journaux comprennent les adresses de protocole Internet (IP), le type de navigateur, le fournisseur d'accès Internet (FAI), l'horodatage, les pages de référence/sortie et éventuellement le nombre de clics. Ces données ne sont liées à aucune information personnellement identifiable. Le but de ces informations est d'analyser les tendances, d'administrer le site, de suivre les mouvements des utilisateurs sur le site Web et de recueillir des informations démographiques. Comme tout autre site Web, nous utilisons des 'cookies' pour stocker des informations, notamment les préférences des visiteurs et les pages du site Web auxquelles le visiteur a accédé ou qu'il a visitées.`,
      adsenseTitle: "4. Cookie DART Google DoubleClick",
      adsenseText: "Google est l'un des fournisseurs tiers sur notre site. Il utilise également des cookies, appelés cookies DART, pour diffuser des annonces aux visiteurs de notre site en fonction de leur visite sur notre site et d'autres sites sur Internet. Cependant, les visiteurs peuvent choisir de refuser l'utilisation des cookies DART en visitant la politique de confidentialité du réseau d'annonces et de contenu de Google à l'URL suivante – https://policies.google.com/technologies/ads",
      partnersTitle: "5. Partenaires publicitaires tiers",
      partnersText: "Certains annonceurs sur notre site peuvent utiliser des cookies et des balises Web. Nos partenaires publicitaires incluent Google AdSense. Les serveurs ou réseaux publicitaires tiers utilisent des technologies telles que les cookies, JavaScript ou les balises Web qui sont utilisées dans leurs publicités et liens respectifs qui apparaissent sur notre plateforme, et qui sont envoyés directement aux navigateurs des utilisateurs. Ils reçoivent automatiquement votre adresse IP lorsque cela se produit. Ces technologies sont utilisées pour mesurer l'efficacité de leurs campagnes publicitaires et/ou pour personnaliser le contenu publicitaire que vous voyez sur les sites Web que vous visitez. Notez que nous n'avons aucun accès ni contrôle sur ces cookies utilisés par des annonceurs tiers.",
      thirdPartyTitle: "6. Politiques de confidentialité des tiers",
      thirdPartyText: "Notre politique de confidentialité ne s'applique pas aux autres annonceurs ou sites Web. Ainsi, nous vous conseillons de consulter les politiques de confidentialité respectives de ces serveurs publicitaires tiers pour des informations plus détaillées. Elles peuvent inclure leurs pratiques et instructions sur la manière de se désinscrire de certaines options.",
      childrenTitle: "7. Informations sur les enfants (Conformité COPPA)",
      childrenText: "Une autre partie de notre priorité est d'ajouter une protection pour les enfants lors de l'utilisation d'Internet. Nous encourageons les parents et les tuteurs à observer, participer et/ou surveiller et guider leur activité en ligne. Nous ne collectons sciemment aucune information personnellement identifiable auprès d'enfants de moins de 13 ans. Si vous pensez que votre enfant a fourni ce type d'informations sur notre site Web, nous vous encourageons vivement à nous contacter immédiatement et nous ferons de notre mieux pour supprimer rapidement ces informations de nos dossiers."
    },
    es: {
      heading: "Política de privacidad",
      subheading: "Última actualización: 11 de junio de 2026",
      consentTitle: "1. Consentimiento",
      consentText: `Al utilizar nuestro sitio web ${siteSettings.site_name} (accesible desde https://gamecis.com), usted acepta nuestra Política de privacidad y está de acuerdo con sus términos.`,
      infoColTitle: "2. Información que recopilamos",
      infoColText: "La información personal que se le solicita que proporcione, y las razones por las que se le solicita que la proporcione, se le aclararán en el momento en que le solicitemos que proporcione su información personal. Si se pone en contacto con nosotros directamente, es posible que recibamos información adicional sobre usted, como su nombre, dirección de correo electrónico, el contenido del mensaje y/o los archivos adjuntos que nos envíe, y cualquier otra información que decida proporcionar.",
      cookiesTitle: "3. Archivos de registro y cookies",
      cookiesText: `${siteSettings.site_name} sigue un procedimiento estándar de uso de archivos de registro. Estos archivos registran a los visitantes cuando visitan sitios web. La información recopilada por los archivos de registro incluye direcciones de protocolo de Internet (IP), tipo de navegador, proveedor de servicios de Internet (ISP), marca de fecha y hora, páginas de referencia/salida y posiblemente el número de clics. Estos datos no están vinculados a ninguna información que sea de identificación personal. El propósito de la información es analizar tendencias, administrar el sitio, rastrear los movimientos de los usuarios en el sitio web y recopilar información demográfica. Al igual que cualquier otro sitio web, utilizamos 'cookies' para almacenar información, incluidas las preferencias de los visitantes y las páginas del sitio web a las que el visitante accedió o visitó.`,
      adsenseTitle: "4. Cookie DART de Google DoubleClick",
      adsenseText: "Google es uno de los proveedores externos de nuestro sitio. También utiliza cookies, conocidas como cookies DART, para publicar anuncios a los visitantes de nuestro sitio en función de su visita a nuestro sitio y otros sitios en Internet. Sin embargo, los visitantes pueden optar por rechazar el uso de cookies de DART visitando la Política de privacidad de la red de anuncios y contenido de Google en la siguiente URL – https://policies.google.com/technologies/ads",
      partnersTitle: "5. Socios publicitarios de terceros",
      partnersText: "Algunos de los anunciantes de nuestro sitio pueden utilizar cookies y web beacons. Nuestros socios publicitarios incluyen Google AdSense. Los servidores o redes publicitarias de terceros utilizan tecnologías como cookies, JavaScript o Web Beacons que se utilizan en sus respectivos anuncios y enlaces que aparecen en nuestra plataforma, los cuales se envían directamente a los navegadores de los usuarios. Reciben automáticamente su dirección IP cuando esto ocurre. Estas tecnologías se utilizan para medir la efectividad de sus campañas publicitarias y/o para personalizar el contenido publicitario que ve en los sitios web que visita. Tenga en cuenta que no tenemos acceso ni control sobre estas cookies que utilizan los anunciantes de terceros.",
      thirdPartyTitle: "6. Políticas de privacidad de terceros",
      thirdPartyText: "Nuestra Política de privacidad no se aplica a otros anunciantes o sitios web. Por lo tanto, le sugerimos que consulte las respectivas Políticas de privacidad de estos servidores publicitarios de terceros para obtener información más detallada. Puede incluir sus prácticas e instrucciones sobre cómo optar por no participar en ciertas opciones.",
      childrenTitle: "7. Información para niños (Cumplimiento de COPPA)",
      childrenText: "Otra parte de nuestra prioridad es agregar protección para los niños mientras usan Internet. Alentamos a los padres y tutores a observar, participar y/o monitorear y guiar su actividad en línea. No recopilamos a sabiendas ninguna información de identificación personal de niños menores de 13 años. Si cree que su hijo proporcionó este tipo de información en nuestro sitio web, le recomendamos encarecidamente que se comunique con nosotros de inmediato y haremos todo lo posible para eliminar de inmediato dicha información de nuestros registros."
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
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-gray-950">{localizedContent.consentTitle}</h2>
              <p>{localizedContent.consentText}</p>
            </div>

            <div className="space-y-2 pt-2">
              <h2 className="text-lg font-bold text-gray-950">{localizedContent.infoColTitle}</h2>
              <p>{localizedContent.infoColText}</p>
            </div>

            <div className="space-y-2 pt-2">
              <h2 className="text-lg font-bold text-gray-950">{localizedContent.cookiesTitle}</h2>
              <p>{localizedContent.cookiesText}</p>
            </div>

            <div className="bg-teal-500/5 p-4 rounded-xl border border-teal-500/10 space-y-2">
              <h2 className="text-lg font-bold text-teal-950">{localizedContent.adsenseTitle}</h2>
              <p className="text-teal-900">{localizedContent.adsenseText}</p>
            </div>

            <div className="space-y-2 pt-2">
              <h2 className="text-lg font-bold text-gray-950">{localizedContent.partnersTitle}</h2>
              <p>{localizedContent.partnersText}</p>
            </div>

            <div className="space-y-2 pt-2">
              <h2 className="text-lg font-bold text-gray-950">{localizedContent.thirdPartyTitle}</h2>
              <p>{localizedContent.thirdPartyText}</p>
            </div>

            <div className="space-y-2 pt-2">
              <h2 className="text-lg font-bold text-gray-950">{localizedContent.childrenTitle}</h2>
              <p>{localizedContent.childrenText}</p>
            </div>
          </div>
        </main>
      </div>

      <Footer siteSettings={siteSettings} lang={lang} />
    </div>
  );
}
