import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  private formState: any = null;

  saveState(state: any) {
    this.formState = state;
  }

  getState(): any {
    return this.formState;
  }

  clearState() {
    this.formState = null;
  }
}