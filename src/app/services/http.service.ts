import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { StoreService } from './store.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  /**
   * @description domain update with production type.
   */
  private apiurl = environment.production ? 'https://psynapsus.herokuapp.com/api/v1' : 'http://localhost:5000/api/v1';
  /**
   * @description Select domain available only on Heroku.
   */
  // private apiurl = 'https://psynapsus.herokuapp.com/api/v1';

  constructor(
    private http: HttpClient,
    private store: StoreService
  ) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      Object.assign(result, {'message': error.error})
      return of(result as T);
    };
  }

  /**
   * @description Returns HTTP Header Options.
   */
  option() {
    return {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        'Content-Type':  'application/json',
        'Authorization': this.store.getCookie('ps-t-a-p'),
        'Email': atob(this.store.getCookie('ps-u-a-p'))
      })
    };
  }

  /**
   * @description Login POST HTTP Request.
   */
  login(data): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/admin/login';

    return this.http.post<any>(url, data).pipe(
      tap(message => message),
      catchError(this.handleError('login', {}))
    );
  }

  /**
   * @description Logout POST HTTP Request.
   */
  logout(data): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/admin/logout';

    return this.http.post<any>(url, data).pipe(
      tap(message => message),
      catchError(this.handleError('logout', {}))
    );
  }

  /**
   * @description Register POST HTTP Request.
   */
  register(data): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/admin';

    return this.http.post<any>(url, data).pipe(
      tap(message => message),
      catchError(this.handleError('register', {}))
    );
  }

  /**
   * @description Post New Update POST HTTP Request.
   */
  post(data): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/post';

    return this.http.post<any>(url, data, this.option()).pipe(
      tap(message => message),
      catchError(this.handleError('post', {}))
    );
  }

  /**
   * @description GET posts with Limitation.
   */
  posts(option): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/post?skip=' + option.skip;

    return this.http.get<any>(url, this.option()).pipe(
      tap(message => message),
      catchError(this.handleError('posts', {}))
    );
  }

  /**
   * @description GET posts with Limitation.
   */
  test(option): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/test';

    return this.http.get<any>(url).pipe(
      tap(message => message),
      catchError(this.handleError('test', {}))
    );
  }
}
