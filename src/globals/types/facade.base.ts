import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SupabaseClient } from '@supabase/supabase-js';

import { BusyProp } from '@globals/types/busy.type';
import { SubjectProp } from '@globals/types/subject.type';
import {
  SemiFullRepository,
  ReadOnlyRepository,
  WritableRepository,
  ReportRepository,
} from '@globals/interfaces/repository.definitions';

@Injectable()
export abstract class FacadeBase implements LifecycleStrategy {
  // public routes = Routes;
  // public strings = Strings;

  constructor(
    api: IFacadeApiBase | SemiFullRepository<any> | WritableRepository<any> | ReadOnlyRepository<any> | ReportRepository<any>,
  ) {}

  //Initialize facade state and get data from api
  public initialize(): void {
    this.bindEvents();
  }

  //Setup event subscriptions and listeners
  public abstract bindEvents(): void;

  //Clear state and unsubscribe from events
  public abstract clearState(): void;

  // Submit form for save data
  public abstract submitForm(): void;
}

export abstract class FacadeStepFormBase implements LifecycleStrategyStepForm {
  public abstract steps: FormStep[];
  public edition = new SubjectProp<boolean>(false);
  public stepIndex = new SubjectProp<number>(0);

  constructor(api: IFacadeApiBase) {
    setTimeout(() => {
      this.bindEvents();
    });
  }

  public abstract initialize(): void;
  public abstract bindEvents(): void;
  public abstract submitForm(): void;
  public abstract onBackPage(): void;
  public abstract onNextPage(): void;

  public nextStep() {
    const current = this.currentStep;
    if (current.form.valid === false) return;
    current.onExit?.();

    const nextIndex = (this.stepIndex.value ?? 0) + 1;
    console.log('nextIndex', nextIndex);
    if (nextIndex < this.steps.length) {
      this.stepIndex.value = nextIndex;
      this.currentStep.onEnter?.();
      if (this.onNextPage) this.onNextPage();
      console.log('stepIndex.value changed', this.stepIndex.value);
    } else {
      this.submitForm();
    }
  }

  public prevStep() {
    const prev = (this.stepIndex.value ?? 0) - 1;
    if (prev >= 0) {
      this.stepIndex.value = prev;
      this.currentStep.onEnter?.();
    } else {
      this.onBackPage();
    }
  }

  public clearState(): void {
    this.steps.forEach((step) => {
      step.form.reset();
    });
    this.stepIndex.value = 0;
  }

  /**
   * Getters
   */

  public get currentStep() {
    return this.steps[this.stepIndex.value ?? 0];
  }

  public get canNext(): boolean {
    return this.currentStep.form.valid === true;
  }
}

export interface LifecycleStrategy {
  initialize(): void;
  bindEvents(): void;
  clearState(): void;
  submitForm(): void;
}
export interface LifecycleStrategyStepForm<T extends { [key: string]: any } = any>
  extends Omit<LifecycleStrategy, 'initialize'> {
  steps: FormStep<T>[];
  stepIndex: SubjectProp<number>;

  initialize(steps: FormStep<T>[]): void;
  onBackPage(): void;
  onNextPage?(): void;
  nextStep(): void;
  prevStep(): void;

  get canNext(): boolean;
}

export interface IFacadeApiBase {
  busy: BusyProp;
  client: SupabaseClient;
}

export interface FormStep<T extends { [key: string]: any } = any> {
  name: string;
  form: FormGroup<T>;
  // actions?: UITableActions[];
  // columns?: UITableColumns[];
  onEnter?: () => void;
  onExit?: () => void;
}
