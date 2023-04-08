import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Depot } from '../model/depot';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  private depotUrl = "http://localhost:8000/api/depot/";

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Depot[]> {
    return this.httpClient.get<Depot[]>(`${this.depotUrl}all`);
  }

  public save(Depot: Depot): Observable<string> {
    return this.httpClient.post<string>(`${this.depotUrl}add`, Depot);
  }

  public delete(id: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.depotUrl}delete/${id}`);
  }

  public update(Depot: Depot): Observable<string> {
    return this.httpClient.put(`${this.depotUrl}update`, Depot, { responseType: 'text' });
  }
}
