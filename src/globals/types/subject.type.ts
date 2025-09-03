import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  Observable,
} from 'rxjs';

export class SubjectProp<T> {
  private _value: T | null = null;
  private _subject = new BehaviorSubject<T | null>(null);

  public _beforeSet: ((value: T) => T) | null = null;
  public _beforeGet: ((value: T) => T) | null = null;

  constructor(
    private defaultValue: T | null = null,
    private beforeSet: ((value: T) => T) | null = null,
    private beforeGet: ((value: T) => T) | null = null
  ) {
    this.value = this.defaultValue;
    this._beforeSet = this.beforeSet;
    this._beforeGet = this.beforeGet;
  }

  get value() {
    if (!this._beforeGet || this._value === null) return this._value;
    return this._beforeGet(this._value);
  }

  set value(newValue: T | null) {
    if (newValue !== null && this._beforeSet) {
      this._value = this._beforeSet(newValue);
    } else {
      this._value = newValue;
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
