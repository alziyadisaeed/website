interface RateLimitEntry {
  attempts: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { attempts: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.attempts >= MAX_ATTEMPTS) {
    return false;
  }

  entry.attempts += 1;
  return true;
}
