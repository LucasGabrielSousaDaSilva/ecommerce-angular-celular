import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { SerieService } from '../../../services/serie.service';
import { inject } from '@angular/core';
import { Serie } from '../../../models/serie.model';

export const serieResolver: ResolveFn<Serie> =     
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(SerieService).findById(route.paramMap.get('id')!);
};
