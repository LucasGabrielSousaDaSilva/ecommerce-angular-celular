import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Processador } from '../../models/processador.model';
import { ProcessadorService } from '../../services/processador.service';
import { inject } from '@angular/core';

export const processadorResolver: ResolveFn<Processador> = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(ProcessadorService).findById(route.paramMap.get('id')!);
};
