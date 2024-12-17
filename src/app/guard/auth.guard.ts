import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isTokenExpired()) {
    console.log('Token inválido');
    authService.removeToken();
    authService.removeUsuarioLogado();
    router.navigate(['/admin/loginADM']);
    return false;
  } else {
    const user = authService.getUsuarioLogado();
    const userType = authService.getUsuarioTipo();

    if (userType === 'Admin' && state.url.startsWith('/user')) {
      alert('Você não tem permissão para acessar essa página!!!');
      router.navigate(['/admin/controle']);
      return false;
    } else if (userType === 'User' && state.url.startsWith('/admin')) {
      alert('Você não tem permissão para acessar essa página!!!');
      router.navigate(['/user/ecommerce']);
      return false;
    }

    console.log('Token válido!');
    return true;
  }
};
