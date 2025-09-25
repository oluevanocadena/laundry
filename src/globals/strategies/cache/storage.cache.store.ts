import { CacheEntry, ICacheStore } from '@globals/types/cache.type';

export class LocalStorageCacheStore implements ICacheStore {
  private prefix = 'cache:'; // 👈 prefijo para aislar tus claves

  get<T>(key: string): T | null {
    const raw = localStorage.getItem(this.prefix + key);
    if (!raw) return null;

    try {
      const entry: CacheEntry<T> = JSON.parse(raw);
      if (entry.expiry && entry.expiry < Date.now()) {
        localStorage.removeItem(this.prefix + key);
        return null;
      }
      return entry.data as T;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T, ttlMs: number = 0): void {
    const entry: CacheEntry<T> = {
      data: value,
      expiry: ttlMs > 0 ? Date.now() + ttlMs : Number.MAX_SAFE_INTEGER,
    };
    localStorage.setItem(this.prefix + key, JSON.stringify(entry));
  }

  clear(key?: string): void {
    if (key) {
      localStorage.removeItem(this.prefix + key);
    } else {
      // 🔥 solo limpiar las claves de cache
      Object.keys(localStorage).forEach((k) => {
        if (k.startsWith(this.prefix)) {
          localStorage.removeItem(k);
        }
      });
    }
  }
}
