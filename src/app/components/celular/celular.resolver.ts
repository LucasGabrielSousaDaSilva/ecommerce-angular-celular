import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { CelularService } from '../../services/celular.service';
import { Celular } from '../../models/celular.model';
import { inject } from '@angular/core';

export const celularResolver: ResolveFn<Celular> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(CelularService).findById(route.paramMap.get('id')!);
};
