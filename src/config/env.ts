/**
 * Environment configuration utility
 * Provides type-safe access to environment variables
 */

interface EnvConfig {
  API_BASE_URL: string;
  RENTALS_API_BASE_URL: string;
  INSTAGRAM_URL: string;
  STUDIO_URL: string;
  LOTTIE_FIREWORKS_URL: string;
  /**
   * Base URL for heavy media hosted on Cloudflare R2 (e.g.
   * "https://pub-xxxx.r2.dev"). Leave empty to serve those assets from the
   * local /public folder instead — see the asset() helper in ./assets.ts.
   */
  CDN_BASE_URL: string;
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];
  console.log(value);
  if (!value && !defaultValue) {
    console.warn(`Environment variable ${key} is not set`);
    return "";
  }
  return value || defaultValue || "";
};

export const env: EnvConfig = {
  API_BASE_URL: getEnvVar("VITE_API_BASE_URL"),
  RENTALS_API_BASE_URL: getEnvVar("VITE_RENTALS_API_BASE_URL"),
  INSTAGRAM_URL: getEnvVar("VITE_INSTAGRAM_URL"),
  STUDIO_URL: getEnvVar("VITE_STUDIO_URL"),
  LOTTIE_FIREWORKS_URL: getEnvVar("VITE_LOTTIE_FIREWORKS_URL"),
  CDN_BASE_URL: getEnvVar("VITE_CDN_BASE_URL", ""),
};

export default env;
