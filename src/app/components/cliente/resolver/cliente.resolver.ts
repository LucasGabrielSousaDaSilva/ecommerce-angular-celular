import { inject } from '@angular/core';
import { Cliente } from "../../../models/cliente.model";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';

export const clienteResolver: ResolveFn<Cliente> = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(ClienteService).findById(route.paramMap.get('id')!);
};
