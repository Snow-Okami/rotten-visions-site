import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiurl = 'http://localhost:3333/api';

  constructor(private http: HttpClient, private store: StoreService) { }

  private getHttp() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.store.getCookie('r-v-token')
      })
    };
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      Object.assign(result, {'message': error.error})
      return of(result as T);
    };
  }

  login(data): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/auth/login';

    return this.http.post<any>(url, data).pipe(
      tap(message => message),
      catchError(this.handleError('login', {}))
    );
  }

  getUser(username): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/user/' + username;
    return this.http.get<any>(url, this.getHttp()).pipe(
      tap(message => message),
      catchError(this.handleError('get user', {}))
    );
  }

  getChats(username): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/user/' + username + '/chats';
    return this.http.get<any>(url, this.getHttp()).pipe(
      tap(message => message),
      catchError(this.handleError('get chats', {}))
    );
  }
}
