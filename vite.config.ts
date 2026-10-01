import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import fs from "node:fs";
import path from "node:path";
import { ROUTES, getRouteHead } from "./src/seo/seo.config";

const SEO_BEGIN = "<!-- seo:begin -->";
const SEO_END = "<!-- seo:end -->";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Serialize the head descriptors for a route into a static HTML fragment. */
function serializeHead(routePath: string): string {
  const { title, tags, jsonLd } = getRouteHead(routePath);
  const lines: string[] = [`<title>${escapeHtml(title)}</title>`];

  for (const tag of tags) {
    const attrs = Object.entries(tag.attrs)
      .map(([k, v]) => `${k}="${escapeHtml(v)}"`)
      .join(" ");
    lines.push(`<${tag.tag} ${attrs} />`);
  }

  for (const block of jsonLd) {
    // Escape "<" so a stray "</script>" in data can never break out of the tag.
    const json = JSON.stringify(block).replace(/</g, "\\u003c");
    lines.push(`<script type="application/ld+json" data-seo-ld>${json}</script>`);
  }

  return lines.join("\n    ");
}

/** Replace the marked SEO block of the template with a route's head fragment. */
function injectHead(template: string, routePath: string): string | null {
  const begin = template.indexOf(SEO_BEGIN);
  const end = template.indexOf(SEO_END);
  if (begin === -1 || end === -1) return null;
  return (
    template.slice(0, begin + SEO_BEGIN.length) +
    "\n    " +
    serializeHead(routePath) +
    "\n    " +
    template.slice(end)
  );
}

/**
 * Bakes per-route <head> metadata into static HTML at build time.
 *
 * Vite emits a single dist/index.html. This plugin rewrites the home route's
 * head in place and writes dist/<route>/index.html for every other route, so
 * crawlers and social scrapers that never execute JavaScript still receive the
 * correct title, description, canonical, Open Graph tags, and JSON-LD.
 *
 * Note: this only takes effect if the host serves the per-route file for the
 * matching clean URL (e.g. /about -> /about/index.html) before falling back to
 * the SPA index.html. Configure the host accordingly.
 */
function staticSeoPlugin(): Plugin {
  let outDir = "dist";
  let root = process.cwd();
  return {
    name: "maddie-west-static-seo",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
      root = config.root;
    },
    closeBundle() {
      const distDir = path.resolve(root, outDir);
      const indexPath = path.join(distDir, "index.html");
      if (!fs.existsSync(indexPath)) return;

      const template = fs.readFileSync(indexPath, "utf-8");
      if (!template.includes(SEO_BEGIN)) {
        this.warn(
          "static-seo: SEO markers not found in index.html; skipping per-route generation.",
        );
        return;
      }

      let written = 0;
      for (const route of ROUTES) {
        const html = injectHead(template, route.path);
        if (!html) continue;

        if (route.path === "/") {
          fs.writeFileSync(indexPath, html);
        } else {
          const dir = path.join(distDir, route.path);
          fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(path.join(dir, "index.html"), html);
        }
        written += 1;
      }
      this.info?.(`static-seo: generated head for ${written} route(s).`);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), staticSeoPlugin()],
});
