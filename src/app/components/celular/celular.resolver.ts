import { ResolveFn } from '@angular/router';

export const celularResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
