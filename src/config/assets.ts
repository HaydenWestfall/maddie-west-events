import env from "./env";

/**
 * Resolve a public asset path to its hosted URL.
 *
 * When VITE_CDN_BASE_URL is set (production), heavy media — studio galleries and
 * videos — is served from Cloudflare R2 so it never ships with the deploy. When
 * the base is empty (local dev), the original root-relative path is returned and
 * the file is served straight from /public.
 *
 * Pass a root-relative path exactly as it lives under /public, e.g.
 * asset("/videos/maddie_primary.mp4").
 */
export const asset = (path: string): string => {
  const base = env.CDN_BASE_URL.replace(/\/+$/, "");
  if (!base) return path;
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
};

export default asset;
