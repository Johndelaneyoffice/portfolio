/* ==========================================================================
   SITE CONTENT
   Everything you read on the page lives in this file. Edit the text here;
   you should not need to touch index.html or main.js for copy changes.

   - Replace every "John Delaney" by changing SITE.name once.
   - Replace the headshot by overwriting images/headshot.jpg (any tall crop
     works best, roughly 2:3), or change SITE.about.photo.src.
   - Replace placeholders in square brackets, e.g. [University, Degree, Year].
   ========================================================================== */

const SITE = {
  name: "John Delaney",
  role: "Head of Family Office",
  location: "London, United Kingdom",

  /* Contact settings: the "Get in touch" buttons open an email to this address. */
  contact: {
    email: "johndelaney118@gmail.com",
    linkedin: "https://www.linkedin.com/in/john-delaney-bb606b450/",
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Expertise", href: "#expertise" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    eyebrow: "Family Office Leadership",
    headline:
      "Turning a family’s vision into clear strategy and institutional-grade execution.",
    sub: "Head of Family Office with a decade of experience across private banking, private equity and family office advisory. Based in London, operating across the UK, Ireland and the US.",
    primary: { label: "Get in touch", href: "#contact" },
    secondary: { label: "View expertise", href: "#expertise" },
    stats: [
      { value: 10, suffix: "+", label: "years experience" },
      { value: 3, label: "jurisdictions" },
      { value: 22, label: "UHNW families advised" },
      { value: 12, prefix: "£", suffix: "m", label: "p.a. directed to philanthropy" },
    ],
  },

  about: {
    eyebrow: "About",
    title: "Quiet confidence, institutional discipline.",
    photo: {
      src: "images/headshot.jpg",
      // alt text is built from SITE.name in main.js
    },
    paragraphs: [
      "{name} leads the single family office of a technology entrepreneur, running a multi-jurisdictional platform spanning investments, real estate, estate management, risk, philanthropy and family governance.",
      "Trusted by principals, trustees and advisers alike, he translates a family’s vision into clear strategy, institutional-grade operations and measured execution.",
      "He is known for institutionalising organically grown family offices: introducing operating models, investment committees, reporting and controls while protecting discretion and the family’s values.",
    ],
    quote: "Institutional rigour, delivered with discretion.",
  },

  /* Icons: "compass" | "landmark" | "trending" | "building" | "shield" | "heart" */
  expertise: {
    eyebrow: "Expertise",
    title: "Six disciplines, one coherent platform.",
    items: [
      {
        icon: "compass",
        title: "Family Office Strategy and Design",
        text: "Operating models and cross-border structures.",
      },
      {
        icon: "landmark",
        title: "Governance",
        text: "Family constitutions, investment committees and next-generation education.",
      },
      {
        icon: "trending",
        title: "Investments",
        text: "Public markets, private capital, co-investment and due diligence.",
      },
      {
        icon: "building",
        title: "Real Estate and Estate Management",
        text: "Restructuring, tax efficiency and simplified ownership.",
      },
      {
        icon: "shield",
        title: "Risk, Reporting and Controls",
        text: "Consolidated reporting and multi-jurisdictional compliance.",
      },
      {
        icon: "heart",
        title: "Philanthropy and Impact",
        text: "Foundation strategy, NGO and multilateral partnerships.",
      },
    ],
  },

  contactSection: {
    eyebrow: "Contact",
    title: "Conversations are held in confidence.",
    note: "Enquiries from principals, trustees, advisers and families are welcome and are handled with strict discretion.",
    buttonLabel: "Get in touch",
    linkedinLabel: "LinkedIn",
  },

  footer: {
    privacy: "Enquiries are handled in confidence.",
  },
};
