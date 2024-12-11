import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { LinhaService } from '../../../services/linha.service';
import { inject } from '@angular/core';
import { Linha } from '../../../models/linha.model';

export const linhaResolver: ResolveFn<Linha> =     
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(LinhaService).findById(route.paramMap.get('id')!);
};
