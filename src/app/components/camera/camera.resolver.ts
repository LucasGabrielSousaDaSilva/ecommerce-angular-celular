import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Camera } from '../../models/camera.model';
import { CameraService } from '../../services/camera.service';
import { inject } from '@angular/core';

export const cameraResolver: ResolveFn<Camera> = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(CameraService).findById(route.paramMap.get('id')!);
};
