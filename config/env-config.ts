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

export const envConfig: EnvConfig = {
  siteUrl: process.env.SITE_BASE_URL || "",
  backendUrl: process.env.BACKEND_BASE_URL || "",
  dbUrl: process.env.DB_URL || "",
  BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS ?? "") || 10,
  jwt: {
    secret: process.env.JWT_SECRET || "",
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || "15m",

    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "7d",
  },
};
