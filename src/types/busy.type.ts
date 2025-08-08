import { BehaviorSubject, Observable } from 'rxjs';

export class BusyProp {
  private _counter = 0;
  private _subject = new BehaviorSubject<boolean>(false);

  constructor(private initialValue: boolean = false) {
    this._subject.next(initialValue);
  }

  get value(): boolean {
    return this._counter > 0;
  }

  set value(newValue: boolean) {
    if (newValue) {
      this._counter++;
    } else {
      this._counter = Math.max(0, this._counter - 1);
    }
    this._subject.next(this.value);
  }

  get change$(): Observable<boolean> {
    return this._subject.asObservable();
  }

  onChange(callback: (value: boolean) => void) {
    return this.change$.subscribe(callback);
  }

  reset() {
    this._counter = 0;
    this._subject.next(false);
  }
}
