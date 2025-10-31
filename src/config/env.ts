/**
 * Environment configuration utility
 * Provides type-safe access to environment variables
 */

interface EnvConfig {
  API_BASE_URL: string;
  RENTALS_API_BASE_URL: string;
  INSTAGRAM_URL: string;
  LOTTIE_FIREWORKS_URL: string;
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];
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
  LOTTIE_FIREWORKS_URL: getEnvVar("VITE_LOTTIE_FIREWORKS_URL"),
};

export default env;
