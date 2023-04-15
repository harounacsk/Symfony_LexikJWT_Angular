import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwToken } from '../model/jw-token';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url="http://localhost:8000/"

  constructor(private httpClient:HttpClient) { }

  public signIn(user: User): Observable<JwToken> {
   // return this.httpClient.post<JwToken>(`${this.url}authentication_token`, user);
   return this.httpClient.post<JwToken>(`${this.url}user/auth`, user);
  }

  public signUp(user: User): Observable<any> {
    return this.httpClient.post<string>(`${this.url}user/register`, user);
  }
}
