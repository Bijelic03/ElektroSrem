import ogImageSrc from "@images/social.png";

export const SITE = {
  title: "Električar Sremska Mitrovica",
  tagline: "Top-quality Hardware Tools",
  description: "Elektrosrem je vaš stručni partner za sve električarske radove u Sremskoj Mitrovici i okolini. Pružamo vrhunske alate i usluge visokog kvaliteta za sve vaše projekte. Otkrijte širok spektar hardverskih alata i usluga koje su dizajnirane da zadovolje sve vaše potrebe. Kontaktirajte nas danas i oslonite se na našu stručnost i pouzdanost za sve vaše električarske radove.",
  description_short: "Elektrosrem nudi povoljne električarske usluge na teritoriji Sremske Mitrovice i okoline.",
  url: "https://elektrosrem.rs",
  author: "Dragan Bijelić",
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "en-US",
    "@id": SITE.url,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    isPartOf: {
      "@type": "WebSite",
      url: SITE.url,
      name: SITE.title,
      description: SITE.description,
    },
  },
};

export const OG = {
  locale: "en_US",
  type: "website",
  url: SITE.url,
  title: `${SITE.title}: : Profesionalne električarske usluge za sve vaše potrebe.`,
  description: "Nudimo usluge iz oblasti elektrike, održavanje i izrada elektro instalacije jake i slabe struje, servis bele tehnike i malih kućnih aparata, ugradnja video nadzora...",
  image: ogImageSrc,
};
