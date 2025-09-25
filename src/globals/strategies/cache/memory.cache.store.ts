import { CacheEntry, ICacheStore } from '@globals/types/cache.type';

export class MemoryCacheStore implements ICacheStore {
  private cache = new Map<string, CacheEntry<any>>();
  private prefix = 'cache:'; // 👈 mismo prefijo que en LocalStorageCacheStore

  get<T>(key: string): T | null {
    const entry = this.cache.get(this.prefix + key);
    if (!entry) return null;

    if (entry.expiry && entry.expiry < Date.now()) {
      this.cache.delete(this.prefix + key);
      return null;
    }
    return entry.data as T;
  }

  set<T>(key: string, value: T, ttlMs: number = 0): void {
    this.cache.set(this.prefix + key, {
      data: value,
      expiry: ttlMs > 0 ? Date.now() + ttlMs : Number.MAX_SAFE_INTEGER,
    });
  }

  clear(key?: string): void {
    if (key) {
      this.cache.delete(this.prefix + key);
    } else {
      // 🔥 solo limpiar las claves de cache
      [...this.cache.keys()].forEach((k) => {
        if (k.startsWith(this.prefix)) {
          this.cache.delete(k);
        }
      });
    }
  }
}
