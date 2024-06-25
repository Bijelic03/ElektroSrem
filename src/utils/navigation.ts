// An array of links for navigation bar
const navBarLinks = [
  { name: "Početna", url: "/" },
  { name: "Usluge", url: "/usluge" },
  { name: "O nama", url: "/o-nama"},
  { name: "Kontakt", url: "/kontakt" }
];

interface ContactInfo {
  name: string,
  text: string,
  url?: string
}

interface PageLink {
  name: string,
  url: string
}

interface FooterData {
  pageLinks: PageLink[],
  contactInfo: ContactInfo[]
}

const footerData: FooterData = {
  pageLinks: [
    { name: "Početna", url: "/" },
      { name: "Usluge", url: "/usluge" },
      { name: "O nama", url: "/o-nama" },
      { name: "Kontakt", url: "/kontakt" }
  ],
  contactInfo: [
    { name: "Telefon", text: "+381 60 1535566", url: "tel:0601535566"},
    { name: "E-mail", text: "elektrosrem1@gmail.com", url: "mailto:elektrosrem1@gmail.com"},
    { name: "Radno vreme", text: " Po pozivu, 7:00-17:00"}
  ]
}
// An object of links for social icons
const socialLinks = {
  facebook: "https://www.facebook.com/p/Elektro-Srem-100088658937454",
  instagram: "https://instagram.com/elektrosrem",
};

export default {
  navBarLinks,
  footerData,
  socialLinks,
};