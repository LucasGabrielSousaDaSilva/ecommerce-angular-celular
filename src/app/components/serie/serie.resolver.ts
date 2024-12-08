import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Serie } from '../../models/serie.model';
import { SerieService } from '../../services/serie.service';
import { inject } from '@angular/core';

export const serieResolver: ResolveFn<Serie> =     
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(SerieService).findById(route.paramMap.get('id')!);
}
