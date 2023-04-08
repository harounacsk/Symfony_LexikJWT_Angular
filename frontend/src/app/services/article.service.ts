import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../model/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private depotUrl = 'http://localhost:8000/api/article/';

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.depotUrl}all`);
  }

  public update(article:Article){
    return this.httpClient.put<string>(`${this.depotUrl}update`,article);
  }

  public save(article: Article): Observable<string> {
    return this.httpClient.post<string>(`${this.depotUrl}add`, article);
  }
}
