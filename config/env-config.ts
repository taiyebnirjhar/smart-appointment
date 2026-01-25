// lib/env.ts
interface EnvConfig {
  dbUrl: string;
  siteUrl: string;
  backendUrl: string;
  BCRYPT_SALT_ROUNDS: number;
  jwt: {
    secret: string;
    accessTokenExpiresIn: string; // e.g., "15m"
    refreshTokenExpiresIn: string; // e.g., "7d"
  };
}

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const envConfig: EnvConfig = {
  siteUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_SITE_BASE_URL || "http://localhost:3000",
  backendUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api"
      : process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:3000/api",
  dbUrl: requireEnv("DB_URL"),
  BCRYPT_SALT_ROUNDS: parseInt(requireEnv("BCRYPT_SALT_ROUNDS")),
  jwt: {
    secret: requireEnv("JWT_SECRET"),
    accessTokenExpiresIn: requireEnv("JWT_ACCESS_TOKEN_EXPIRES_IN"), // e.g., "15m"

    refreshTokenExpiresIn: requireEnv("JWT_REFRESH_TOKEN_EXPIRES_IN"), // e.g., "7d"
  },
};
