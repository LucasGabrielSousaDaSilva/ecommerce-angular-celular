import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { PortaSlot } from '../../../models/porta-slot.model';
import { inject } from '@angular/core';
import { PortaSlotService } from '../../../services/porta-slot.service';

export const portaSlotResolver: ResolveFn<PortaSlot> = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(PortaSlotService).findById(route.paramMap.get('id')!);
};
