// An array of links for navigation bar
const navBarLinks = [
  { name: "Početna", url: "/ElektroSrem" },
  { name: "Usluge", url: "/ElektroSrem/usluge" },
  { name: "O nama", url: "/ElektroSrem/o-nama"},
  { name: "Kontakt", url: "/ElektroSrem/kontakt" }
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
    { name: "Početna", url: "/ElektroSrem" },
      { name: "Usluge", url: "/ElektroSrem/usluge" },
      { name: "O nama", url: "/ElektroSrem/o-nama" },
      { name: "Kontakt", url: "/ElektroSrem/kontakt" }
  ],
  contactInfo: [
    { name: "Telefon", text: "+381 60 1535566", url: "tel:0601535566"},
    { name: "E-mail", text: "elektrosrem@gmail.com", url: "/ElektroSrem/kontakt"},
    { name: "Radno vreme", text: "Po pozivu, 9:00-20:00"}
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