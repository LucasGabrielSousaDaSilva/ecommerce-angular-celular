import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { Usuario } from "../models/usuario.model";
import { LocalStorageService } from "./local-storage.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'http://localhost:8080/Autorizacao';

    // private tokenKey = 'jwt_token';
    private usuarioLogadoKey = 'usuario_logado';
    private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
    private usuarioLogadoSubject = new BehaviorSubject<any>(this.getUsuarioLogadoFromLocalStorage());
    private usuarioTipoKey = 'usuario_tipo'; //armazenar o tipo de usuario logado 


  // Salva o token no localStorage
  private setToken(token: string): void {
      localStorage.setItem('token', token);
  }

    constructor(private httpClient: HttpClient,
                private jwtHelper: JwtHelperService,
                private router: Router
    ) {
    }

    public login(username: string, senha: string, perfil: number): Observable<any> {
        const params = {
            username: username,
            senha: senha,
            perfil: perfil
        }
      //{ observe: 'response' } para garantir que a resposta completa seja retornada (incluindo o cabeçalho)
    return this.httpClient.post(`${this.baseUrl}/login`, params, {observe: 'response'}).pipe(
        tap((res: any) => {
          const authToken = res.headers.get('Authorization');
          if (authToken) {
            this.setToken(authToken);
            const usuarioLogado = res.body;
            //console.log(usuarioLogado);

            this.loggedIn.next(true);
            localStorage.setItem('token', authToken);

            if (usuarioLogado) {
              const tipo = perfil === 1 ? 'User' : 'Admin';

              this.setUsuarioTipo(tipo);
              this.setUsuarioLogado(usuarioLogado);
              this.usuarioLogadoSubject.next(usuarioLogado);
            }
          }
        })
      );
    }

    // login(username: string, senha: string, perfil: number): Observable<any> {
    //   const payload = { username, senha, perfil };
    //   return this.httpClient.post(this.baseUrl, payload, { observe: 'response' }).pipe(
    //     map((response) => {
    //       const token = response.headers.get('Authorization');
    //       const usuario = response.body;
  
    //       if (token) {
    //         localStorage.setItem('token', token);
    //         this.loggedIn.next(true);
    //         this.setUsuarioLogado(usuario); // Atualiza o usuário logado
  
    //       }
    //       return usuario;
    //     })
    //   );
    // }


  
    // Salvar o tipo do usuário logado
    private setUsuarioTipo(tipo: string): void {
      localStorage.setItem(this.usuarioTipoKey, tipo);
    }
  
    // Recuperar o tipo do usuário logado
    getUsuarioTipo(): string | null {
      return localStorage.getItem(this.usuarioTipoKey);
    }
  
    // Remover o tipo do usuário
    removeUsuarioTipo(): void {
      localStorage.removeItem(this.usuarioTipoKey);
    }
  
    register(email: string): Observable<any> {
      const payload = { email };
      return this.httpClient.post(this.baseUrl, payload, { observe: 'response' }).pipe(
        map((res) => {
          const token = res.headers.get('Authorization');
          const usuario = res.body;
  
          if (token) {
            localStorage.setItem('token', token);
            this.loggedIn.next(true);
            this.setUsuarioLogado(usuario); // Atualiza o usuário logado
          }
          return usuario;
        })
      );
    }
  
    logout(): void {
      this.removeToken();
      this.removeUsuarioTipo();
      this.loggedIn.next(false);
      this.usuarioLogadoSubject.next(null); // Limpa o usuário logado
      this.router.navigate(['/login']);
    }
  
    isLoggedIn(): boolean {
      const token = localStorage.getItem('token');
      return token != null && !this.jwtHelper.isTokenExpired(token);
    }
  
    hasToken(): boolean {
      return !!localStorage.getItem('token');
    }
  
    getToken(): string | null {
      return localStorage.getItem('token');
    }
  
    decodeToken(token: string): any {
      return this.jwtHelper.decodeToken(token);
    }
  
    // Obtém o estado do usuário logado, caso exista
    getUsuarioLogado(): Observable<any> {
      return this.usuarioLogadoSubject.asObservable();
    }
  
    // Salva o usuário logado no localStorage e no BehaviorSubject
    private setUsuarioLogado(usuario: any): void {
      localStorage.setItem(this.usuarioLogadoKey, JSON.stringify(usuario));
      this.usuarioLogadoSubject.next(usuario);
    }

        // Recupera o usuário logado do localStorage
        private getUsuarioLogadoFromLocalStorage(): any {
          const usuario = localStorage.getItem(this.usuarioLogadoKey);
          return usuario ? JSON.parse(usuario) : null;
      }
  
    // Remove o token do localStorage
    removeToken(): void {
      localStorage.removeItem('token');
    }
  
    // Remove o usuário logado do localStorage e BehaviorSubject
    removeUsuarioLogado(): void {
      localStorage.removeItem(this.usuarioLogadoKey);
      this.usuarioLogadoSubject.next(null); // Limpa o usuário logado
    }
  
    isTokenExpired(): boolean {
      const token = this.getToken();
      if (!token) {
          return true;
      }
      try {
          return this.jwtHelper.isTokenExpired(token);
      } catch (error) {
          console.error('Token invalido', error);
          return true;
      }
    }



}