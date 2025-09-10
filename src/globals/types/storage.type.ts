import { BehaviorSubject, distinctUntilChanged, filter, Observable } from 'rxjs';

export class StorageProp<T> {
  private _value: T | null = null;
  private _subject = new BehaviorSubject<T | null>(null);
  private _drop: boolean = false;

  public _beforeSet: ((value: T) => T) | null = null;
  public _beforeGet: ((value: T) => T) | null = null;

  constructor(
    private defaultValue: T | null = null,
    private storageKey: string,
    private beforeSet: ((value: T) => T) | null = null,
    private beforeGet: ((value: T) => T) | null = null,
    private drop: boolean = false,
  ) {
    this._value = this.defaultValue;
    this.storageKey = this.storageKey;
    this._beforeSet = this.beforeSet;
    this._beforeGet = this.beforeGet;
    this._drop = this.drop;
  }

  get value() {
    const raw = localStorage.getItem(this.storageKey) ?? 'null';
    let parsed: any = null;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = raw;
    }
    const value = parsed;
    if (typeof this._beforeGet !== 'function') {
      return value;
    }
    try {
      return this._beforeGet(value);
    } catch (err) {
      console.error('[StorageService] _beforeGet lanzó error:', err);
      return value; // fallback al valor original
    }
  }

  set value(newValue: T | null) {
    if (newValue !== null && this._beforeSet) {
      this._value = this._beforeSet(newValue);
    } else {
      this._value = newValue;
    }
    if (this._drop === false) {
      localStorage.setItem(this.storageKey, JSON.stringify(newValue));
    } else {
      localStorage.removeItem(this.storageKey);
    }
    this._subject.next(newValue);
  }

  get change$(): Observable<T | null> {
    return this._subject.asObservable().pipe(distinctUntilChanged());
  }

  onChange(callback: (value: T) => void, notNull: boolean = true) {
    const observable = notNull
      ? this.change$.pipe(filter((value): value is T => !!value))
      : this.change$.pipe(filter((value): value is T => value !== null));

    return observable.subscribe(callback);
  }
}
