// Simple token-based auth for the admin panel.
// In production, replace with a proper auth provider.

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "sion2026";
const AUTH_SECRET = process.env.AUTH_SECRET || "sion-secret-key-change-in-production";

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function generateToken(): string {
  const payload = {
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    iat: Date.now(),
  };
  // Simple base64 encoding with secret — not cryptographically secure, fine for demo
  return Buffer.from(JSON.stringify(payload) + "." + AUTH_SECRET).toString("base64");
}

export function validateToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [payloadStr] = decoded.split("." + AUTH_SECRET);
    const payload = JSON.parse(payloadStr);
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}
