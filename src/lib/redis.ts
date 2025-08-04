import { Redis } from '@upstash/redis';

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error('Missing Upstash Redis environment variables');
}

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Helper function to generate page view key
export function getPageViewKey(path: string): string {
  return `pageviews:${path}`;
}

// Helper function to increment page views
export async function incrementPageView(path: string): Promise<number> {
  const key = getPageViewKey(path);
  return await redis.incr(key);
}

// Helper function to get page views
export async function getPageViews(path: string): Promise<number> {
  const key = getPageViewKey(path);
  const views = await redis.get(key);
  return typeof views === 'number' ? views : 0;
}