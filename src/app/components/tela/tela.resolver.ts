import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { TelaService } from '../../services/tela.service';
import { inject } from '@angular/core';
import { Tela } from '../../models/tela.model';

export const telaResolver: ResolveFn<Tela> = 
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(TelaService).findById(route.paramMap.get('id')!);
};
