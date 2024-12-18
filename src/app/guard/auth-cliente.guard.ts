import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authClienteGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isTokenExpired()){
    console.log('Token inválido!');
    authService.removeToken();
    authService.removeUsuarioLogado();
    router.navigate(['/login']);
    if(authService.getUsuarioTipo() === 'Admin'){
      alert('Você não tem permissão para acessar essa página!!!');
      router.navigate(['/admin/login']);
    }
    return false;
  } else {
    console.log('Token válido!');
    return true;
  }
};