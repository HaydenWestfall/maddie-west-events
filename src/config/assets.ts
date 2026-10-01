import env from "./env";

/**
 * Every static asset the site ships lives under /public/media, so the whole
 * deploy is one folder to upload alongside index.html and /assets.
 */
export const MEDIA_BASE = "/media";

/**
 * Resolve a media path to its hosted URL.
 *
 * When VITE_CDN_BASE_URL is set (production), heavy media — studio galleries and
 * videos — is served from Cloudflare R2 so it never ships with the deploy. When
 * the base is empty (local dev), the path is returned as-is and the file is
 * served straight from /public/media.
 *
 * Pass a root-relative path exactly as it lives under /public, e.g.
 * asset("/media/videos/maddie_primary.mp4"). The R2 bucket is laid out without
 * the /media prefix (keys are "videos/…", "studio/gallery1/…"), so the prefix is
 * stripped when building the CDN URL — keep that in mind if the bucket is ever
 * re-uploaded.
 */
export const asset = (path: string): string => {
  const base = env.CDN_BASE_URL.replace(/\/+$/, "");
  if (!base) return path;

  const key = path.startsWith(`${MEDIA_BASE}/`) ? path.slice(MEDIA_BASE.length) : path;
  return `${base}${key.startsWith("/") ? "" : "/"}${key}`;
};

export default asset;
