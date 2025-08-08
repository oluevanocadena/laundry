import { FormGroup } from '@angular/forms';
import {
	BehaviorSubject,
	debounceTime,
	distinctUntilChanged,
	filter,
	Observable,
	takeUntil,
} from 'rxjs';

export class FormProp<T> {
	private _value: T | null = null;
	private _subject = new BehaviorSubject<T | null>(null);

	public _beforeSet: ((value: T) => T) | null = null;
	public _beforeGet: ((value: T) => T) | null = null;

	constructor(
		private formGroup: FormGroup,
		private controlName: string,
		private defaultValue?: T | null,
		private beforeSet?: ((value: T) => T) | null,
		private beforeGet?: ((value: T) => T) | null
	) {
		this.value = this.defaultValue;
		this._beforeSet = this.beforeSet;
		this._beforeGet = this.beforeGet;

		// Suscribirse a los cambios del formGroup
		this.formGroup
			.get(this.controlName)
			?.valueChanges.pipe(distinctUntilChanged())
			.subscribe((value: T | null) => {
				if (value !== this._value) {
					this.value = value;
				}
			});
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
		this.formGroup.get(this.controlName)?.patchValue(newValue);
		this._subject.next(newValue);
	}

	get change$(): Observable<T | null> {
		return this._subject.asObservable().pipe(distinctUntilChanged());
	}

	onChange(callback: (value: T | null) => void) {
		return this.change$.subscribe(callback);
	}

	onChangeDebounce(callback: (value: T | null) => void, delay: number = 500) {
		return this.change$
			.pipe(debounceTime(delay), distinctUntilChanged())
			.subscribe(callback);
	}
}
