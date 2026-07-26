/**
 * Single source of truth for all SEO metadata.
 *
 * This module is consumed in two places:
 *   1. At runtime by the <Seo> component (src/seo/Seo.tsx), which imperatively
 *      applies the correct <head> tags on every client-side route change. This
 *      is what JavaScript-executing crawlers (e.g. Googlebot) see.
 *   2. At build time by the static-SEO Vite plugin (see vite.config.ts), which
 *      writes a per-route index.html with the same tags baked into the static
 *      HTML. This is what non-JS crawlers and social scrapers
 *      (Facebook, iMessage, LinkedIn, Slack, X) see.
 *
 * Keep everything data-driven here so the two consumers never drift apart.
 */

export const SITE = {
  /** Canonical production origin — no trailing slash. */
  url: "https://maddiewestevents.com",
  name: "Maddie West Events",
  defaultTitle:
    "Maddie West Events | Wedding & Event Coordinator in Dayton, OH",
  defaultDescription:
    "Maddie West Events is a boutique wedding and event coordination company serving Dayton, Cincinnati, and Columbus, Ohio. Detail-driven planning so you can be fully present on your big day.",
  /** Fallback social-share image (absolutized at use). Ideally a 1200x630 image. */
  defaultImage: "/home/about_maddie.webp",
  locale: "en_US",
} as const;

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  /** Social share image path (root-relative). Absolutized automatically. */
  image?: string;
  /** Open Graph type. Defaults to "website". */
  type?: string;
  /** When true, emits noindex and drops the route from the sitemap. */
  noindex?: boolean;
  /** Page-specific structured data, merged with the site-wide graph. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/** Turn a root-relative path into an absolute URL against the canonical origin. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE.url}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

/* ---------------------------------------------------------------------------
 * Site-wide structured data (included on every indexable page)
 * ------------------------------------------------------------------------- */

const ORGANIZATION_LD: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE.url}/#business`,
  name: "Maddie West Events",
  url: SITE.url,
  image: absoluteUrl("/home/about_maddie.webp"),
  logo: absoluteUrl("/logo/maddie_west_logo.png"),
  description:
    "Boutique wedding and event coordination serving Dayton, Cincinnati, and Columbus, Ohio.",
  founder: { "@type": "Person", name: "Madison Westfall" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dayton",
    addressRegion: "OH",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Dayton, Ohio" },
    { "@type": "City", name: "Cincinnati, Ohio" },
    { "@type": "City", name: "Columbus, Ohio" },
  ],
  knowsAbout: [
    "Wedding coordination",
    "Wedding planning",
    "Event coordination",
    "Day-of coordination",
  ],
  priceRange: "$$",
  sameAs: [
    "https://www.instagram.com/maddiewestevents/",
    "https://www.instagram.com/stillacrestudio/",
  ],
};

const WEBSITE_LD: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: "Maddie West Events",
  publisher: { "@id": `${SITE.url}/#business` },
  inLanguage: "en-US",
};

/** Graph included on every indexable route. */
export const SITE_JSONLD: Record<string, unknown>[] = [ORGANIZATION_LD, WEBSITE_LD];

/* ---------------------------------------------------------------------------
 * Per-route metadata
 * ------------------------------------------------------------------------- */

export const ROUTES: RouteMeta[] = [
  {
    path: "/",
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    image: "/home/about_maddie.webp",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE.url}/#webpage`,
      url: `${SITE.url}/`,
      name: SITE.defaultTitle,
      isPartOf: { "@id": `${SITE.url}/#website` },
      about: { "@id": `${SITE.url}/#business` },
      description: SITE.defaultDescription,
    },
  },
  {
    path: "/about",
    title: "About Maddie Westfall | Wedding Coordinator | Maddie West Events",
    description:
      "Meet Madison Westfall, founder and lead coordinator of Maddie West Events — a boutique wedding and event planner based near Dayton, Ohio, serving Cincinnati, Columbus, and beyond.",
    image: "/about/maddie_1.webp",
    type: "profile",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      url: `${SITE.url}/about`,
      name: "About Maddie West Events",
      mainEntity: {
        "@type": "Person",
        name: "Madison Westfall",
        jobTitle: "Wedding & Event Coordinator",
        worksFor: { "@id": `${SITE.url}/#business` },
        image: absoluteUrl("/about/maddie_1.webp"),
      },
    },
  },
  {
    path: "/packages",
    title: "Wedding Coordination Packages & Pricing | Maddie West Events",
    description:
      "Explore Maddie West Events' wedding coordination packages — Month-Of ($2,200), Final Planning ($2,500), and Partial Planning ($3,250) — for weddings across Dayton, Cincinnati, and Columbus, OH.",
    image: "/packages/month_of_package.webp",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Wedding coordination",
      provider: { "@id": `${SITE.url}/#business` },
      areaServed: ["Dayton, OH", "Cincinnati, OH", "Columbus, OH"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Wedding Coordination Packages",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Month Of Coordination Package",
            priceCurrency: "USD",
            price: "2200",
            description:
              "Coordination beginning one month before the wedding, including rehearsal and 10 hours of day-of coverage.",
          },
          {
            "@type": "Offer",
            name: "Final Planning Package",
            priceCurrency: "USD",
            price: "2500",
            description:
              "Everything in Month Of, plus monthly meetings, vendor meetings, timeline, and seating chart, starting 3 months out.",
          },
          {
            "@type": "Offer",
            name: "Partial Planning Package",
            priceCurrency: "USD",
            price: "3250",
            description:
              "Everything in Month Of, plus guidance through vendors, décor, and details, starting 6 months out.",
          },
        ],
      },
    },
  },
  {
    path: "/studio",
    title:
      "Still Acre Studio | Natural-Light Photo Studio in Ludlow Falls, OH",
    description:
      "Still Acre Studio is a private, natural-light photography studio nestled in the woods at 9358 Fenner Rd, Ludlow Falls, Ohio. Hourly bookings at $50/hour for portraits, engagements, and family sessions.",
    image: "/studio/main.jpg",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": ["PhotographyBusiness", "LocalBusiness"],
      name: "Still Acre Studio",
      url: `${SITE.url}/studio`,
      image: absoluteUrl("/studio/main.jpg"),
      description:
        "Private, natural-light photography studio surrounded by woods, available for hourly bookings.",
      parentOrganization: { "@id": `${SITE.url}/#business` },
      address: {
        "@type": "PostalAddress",
        streetAddress: "9358 Fenner Rd",
        addressLocality: "Ludlow Falls",
        addressRegion: "OH",
        postalCode: "45339",
        addressCountry: "US",
      },
      priceRange: "$",
      makesOffer: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: "50",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "50",
          priceCurrency: "USD",
          unitCode: "HUR",
        },
        itemOffered: {
          "@type": "Service",
          name: "Photography studio hourly rental",
        },
      },
      sameAs: ["https://www.instagram.com/stillacrestudio/"],
    },
  },
  {
    path: "/rentals",
    title: "Event & Wedding Décor Rentals | Maddie West Events",
    description:
      "Browse curated event and wedding décor rentals from Maddie West Events. Pick your date, check live availability, and request the pieces that bring your celebration to life across the Dayton, OH area.",
    image: "/general/tablescape.jpg",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Event and wedding décor rental",
      provider: { "@id": `${SITE.url}/#business` },
      areaServed: ["Dayton, OH", "Cincinnati, OH", "Columbus, OH"],
      description:
        "Curated event and wedding décor rentals available to reserve for your event date.",
    },
  },
  {
    path: "/journal",
    title: "Wedding Journal & Real Weddings | Maddie West Events",
    description:
      "Real wedding stories from Maddie West Events. Go behind the scenes of celebrations across Ohio — the details, the emotions, and the couples who made each day unforgettable.",
    image: "/journal/journal_header_3.webp",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      url: `${SITE.url}/journal`,
      name: "Maddie West Events Journal",
      publisher: { "@id": `${SITE.url}/#business` },
      description:
        "Long-form stories from real weddings coordinated by Maddie West Events.",
    },
  },
  {
    path: "/testimonies",
    title: "Client Reviews & Testimonials | Maddie West Events",
    description:
      "See what couples say about working with Maddie West Events. Real testimonials from brides and grooms across Dayton, Cincinnati, and Columbus, Ohio.",
    image: "/testimony/testimony-cover.webp",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: `${SITE.url}/testimonies`,
      name: "Client Testimonials",
      about: { "@id": `${SITE.url}/#business` },
    },
  },
  {
    path: "/contact",
    title: "Contact | Book Your Wedding Coordinator | Maddie West Events",
    description:
      "Get in touch with Maddie West Events to plan your wedding or event, or to book a Still Acre Studio session. Fill out the inquiry form and hear back within 48 hours.",
    image: "/contact/contact_cover.webp",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      url: `${SITE.url}/contact`,
      name: "Contact Maddie West Events",
      about: { "@id": `${SITE.url}/#business` },
    },
  },
  {
    path: "/rentals/agreement",
    title: "Rental Agreement | Maddie West Events",
    description:
      "Rental agreement acknowledgment for Maddie West Events décor rentals.",
    noindex: true,
  },
];

export const ROUTE_MAP: Record<string, RouteMeta> = Object.fromEntries(
  ROUTES.map((r) => [r.path, r]),
);

/* ---------------------------------------------------------------------------
 * Head descriptor builder (shared by runtime + static consumers)
 * ------------------------------------------------------------------------- */

export interface HeadTag {
  tag: "meta" | "link";
  attrs: Record<string, string>;
}

export interface RouteHead {
  title: string;
  tags: HeadTag[];
  jsonLd: Record<string, unknown>[];
}

/**
 * Resolve the full set of head descriptors for a given route path. Unknown
 * paths fall back to the site defaults (still indexable, canonical to self).
 */
export function getRouteHead(path: string): RouteHead {
  const meta = ROUTE_MAP[path];
  const title = meta?.title ?? SITE.defaultTitle;
  const description = meta?.description ?? SITE.defaultDescription;
  const canonical = absoluteUrl(meta?.path ?? path);
  const image = absoluteUrl(meta?.image ?? SITE.defaultImage);
  const ogType = meta?.type ?? "website";
  const robots = meta?.noindex ? "noindex, nofollow" : "index, follow";

  const tags: HeadTag[] = [
    { tag: "meta", attrs: { name: "description", content: description } },
    { tag: "meta", attrs: { name: "robots", content: robots } },
    { tag: "link", attrs: { rel: "canonical", href: canonical } },
    // Open Graph
    { tag: "meta", attrs: { property: "og:type", content: ogType } },
    { tag: "meta", attrs: { property: "og:site_name", content: SITE.name } },
    { tag: "meta", attrs: { property: "og:title", content: title } },
    { tag: "meta", attrs: { property: "og:description", content: description } },
    { tag: "meta", attrs: { property: "og:url", content: canonical } },
    { tag: "meta", attrs: { property: "og:image", content: image } },
    { tag: "meta", attrs: { property: "og:locale", content: SITE.locale } },
    // Twitter
    { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
    { tag: "meta", attrs: { name: "twitter:title", content: title } },
    { tag: "meta", attrs: { name: "twitter:description", content: description } },
    { tag: "meta", attrs: { name: "twitter:image", content: image } },
  ];

  const pageLd = meta?.jsonLd
    ? Array.isArray(meta.jsonLd)
      ? meta.jsonLd
      : [meta.jsonLd]
    : [];
  // noindex pages don't carry the site-wide business graph.
  const jsonLd = meta?.noindex ? pageLd : [...SITE_JSONLD, ...pageLd];

  return { title, tags, jsonLd };
}
