// lib/env.ts
interface EnvConfig {
  dbUrl: string;
  BCRYPT_SALT_ROUNDS: number;
  jwt: {
    secret: string;
    accessTokenExpiresIn: string; // e.g., "15m"
    accessTokenExpiresInSeconds: number; // added for cookie maxAge
    refreshTokenExpiresIn: string; // e.g., "7d"
    refreshTokenExpiresInSeconds: number; // added for cookie maxAge
  };
}

/**
 * Helper to require env vars at runtime
 */
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

/**
 * Converts JWT expiry string like "15m" or "7d" to seconds
 */
function parseExpiryToSeconds(expiry: string): number {
  const unit = expiry.slice(-1); // last char
  const num = parseInt(expiry.slice(0, -1), 10);
  switch (unit) {
    case "s":
      return num;
    case "m":
      return num * 60;
    case "h":
      return num * 60 * 60;
    case "d":
      return num * 60 * 60 * 24;
    default:
      throw new Error(`Invalid expiry format: ${expiry}`);
  }
}

export const envConfig: EnvConfig = {
  dbUrl: requireEnv("DB_URL"),
  BCRYPT_SALT_ROUNDS: parseInt(requireEnv("BCRYPT_SALT_ROUNDS")),
  jwt: {
    secret: requireEnv("JWT_SECRET"),
    accessTokenExpiresIn: requireEnv("JWT_ACCESS_TOKEN_EXPIRES_IN"), // e.g., "15m"
    accessTokenExpiresInSeconds: parseExpiryToSeconds(
      requireEnv("JWT_ACCESS_TOKEN_EXPIRES_IN"),
    ),
    refreshTokenExpiresIn: requireEnv("JWT_REFRESH_TOKEN_EXPIRES_IN"), // e.g., "7d"
    refreshTokenExpiresInSeconds: parseExpiryToSeconds(
      requireEnv("JWT_REFRESH_TOKEN_EXPIRES_IN"),
    ),
  },
};
