import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private dictionary = signal<Record<string, any>>({});
  currentLang = signal<string>('es');

  constructor() {
    this.load(this.currentLang());
  }

  async load(lang: string) {
    try {
      console.log('🚩 [load] lang', lang);
      const res = await fetch(`/assets/i18n/${lang}.json`);
      const json = await res.json();
      this.dictionary.set(json);
      this.currentLang.set(lang);
    } catch (err) {
      console.error(`Error cargando el idioma ${lang}`, err);
    }
  }

  t(path: string): string {
    if (!this.dictionary() || Object.keys(this.dictionary()).length === 0) return '';
    const keys = path.split('.');
    const value = keys.reduce((acc, key) => acc?.[key], this.dictionary());
    return value?.toString();
  }
}
