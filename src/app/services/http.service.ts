import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  /**
   * @description Local system URL.
   */
  private apiurl = 'http://localhost:5000/api/v1';

  /**
   * @description Live server URL.
   */
  // private apiurl = 'https://psynapsus.herokuapp.com/api/v1';

  constructor(
    private http: HttpClient,
    private store: StoreService
  ) { }

  private header() {
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
    let url = this.apiurl + '/admin/login';

    return this.http.post<any>(url, data).pipe(
      tap(message => message),
      catchError(this.handleError('login', {}))
    );
  }
}
