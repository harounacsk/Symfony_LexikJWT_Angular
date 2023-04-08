import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  jwtHelperService = new JwtHelperService();
  constructor(private router:Router) { }

  public saveToken(token:string){
    localStorage.setItem('token',token);
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public clearToken(){
    localStorage.removeItem('token');
  }

  public isTokenValid():boolean{
    return (this.isTokenNotNull()  && !this.jwtHelperService.isTokenExpired(this.getToken()));
  }

  public isTokenExpired(){
    return this.isTokenNotNull() && this.jwtHelperService.isTokenExpired(this.getToken());
  }

  public isTokenNotNull():boolean{
    return this.getToken()!= null
  }
}
