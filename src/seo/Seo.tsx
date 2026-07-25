import { useEffect } from "react";
import { getRouteHead } from "./seo.config";

/**
 * Imperatively syncs <head> for the current route.
 *
 * The SPA renders on the client, so JS-executing crawlers (Googlebot) rely on
 * this to see a per-page title, description, canonical, Open Graph / Twitter
 * tags, and JSON-LD. Non-JS crawlers and social scrapers are served the same
 * tags statically by the build-time plugin in vite.config.ts.
 *
 * Managed tags are marked with `data-seo` (meta/link) or `data-seo-ld`
 * (JSON-LD) so we can update them idempotently and replace any tags the static
 * build already baked in, without ever duplicating them.
 */

function upsertMeta(attrs: Record<string, string>) {
  const selector = attrs.name
    ? `meta[name="${attrs.name}"]`
    : `meta[property="${attrs.property}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
  el.setAttribute("data-seo", "");
}

function upsertLink(attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${attrs.rel}"]`,
  );
  if (!el) {
    el = document.createElement("link");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
  el.setAttribute("data-seo", "");
}

const Seo: React.FC<{ route: string }> = ({ route }) => {
  useEffect(() => {
    const { title, tags, jsonLd } = getRouteHead(route);

    document.title = title;

    tags.forEach((t) => {
      if (t.tag === "meta") upsertMeta(t.attrs);
      else upsertLink(t.attrs);
    });

    // Replace any structured data (static-baked or previously applied).
    document.head
      .querySelectorAll("script[data-seo-ld]")
      .forEach((n) => n.remove());
    jsonLd.forEach((block) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-ld", "");
      script.text = JSON.stringify(block);
      document.head.appendChild(script);
    });
  }, [route]);

  return null;
};

export default Seo;
