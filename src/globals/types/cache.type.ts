export type CacheEntry<T> = {
  data: T;
  expiry: number; // timestamp en ms
};

export interface ICacheStore {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T, ttlMs?: number): void;
  clear(key?: string): void;
}
