/**
 * Post-build cleanup: remove media that is served from Cloudflare R2 in
 * production from the dist/ output, so it never ships with the Hostinger
 * deploy. The files stay in /public for local dev (where VITE_CDN_BASE_URL is
 * empty and assets load locally) — this only prunes the built bundle.
 *
 * Keep this list in sync with the paths routed through asset() (src/config/assets.ts).
 */
import { rm, readdir } from "node:fs/promises";
import path from "node:path";

const dist = path.resolve("dist");

// Whole folders that live on R2.
const cdnDirs = ["videos"];

// All studio galleries live on R2; studio/main.jpg + about.jpg stay local.
try {
  const studio = await readdir(path.join(dist, "studio"), { withFileTypes: true });
  for (const entry of studio) {
    if (entry.isDirectory() && entry.name.startsWith("gallery")) {
      cdnDirs.push(path.join("studio", entry.name));
    }
  }
} catch {
  // dist/studio may not exist in some build modes — nothing to prune.
}

for (const dir of cdnDirs) {
  await rm(path.join(dist, dir), { recursive: true, force: true });
  console.log(`strip-cdn-assets: removed dist/${dir}`);
}
