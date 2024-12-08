import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Sensor } from '../../../models/sensor.model';
import { SensorService } from '../../../services/sensor.service';

export const sensorResolver: ResolveFn<Sensor> =     
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(SensorService).findById(route.paramMap.get('id')!);
};
