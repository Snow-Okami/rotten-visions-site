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
  option(type: any) {
    return {
      headers: new HttpHeaders(Object.assign({}, type, {
        'Authorization': this.store.getCookie('ps-t-a-p'),
        'Email': atob(this.store.getCookie('ps-u-a-p'))
      }))
    };
  }

  /**
   * @description Login POST HTTP Request.
   */
  login(data: any): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/user/login';

    return this.http.post<any>(url, data).pipe(
      tap(message => message),
      catchError(this.handleError('login', {}))
    );
  }

  /**
   * @description Logout POST HTTP Request.
   */
  logout(data: any): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/user/logout';

    return this.http.post<any>(url, data).pipe(
      tap(message => message),
      catchError(this.handleError('logout', {}))
    );
  }

  /**
   * @description Register POST HTTP Request.
   */
  register(data: any): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/user';

    return this.http.post<any>(url, data).pipe(
      tap(message => message),
      catchError(this.handleError('register', {}))
    );
  }

  /**
   * @description gets user details by email.
   */
  user(email: string): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/user/' + email;

    return this.http.get<any>(url, this.option({ 'Content-Type':  'application/json' })).pipe(
      tap(message => message),
      catchError(this.handleError('user', {}))
    );
  }

  /**
   * @description Post New Update POST HTTP Request.
   */
  post(data: any): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/post';

    return this.http.post<any>(url, data, this.option({ 'enctype': 'multipart/form-data' })).pipe(
      tap(message => message),
      catchError(this.handleError('post', {}))
    );
  }

  /**
   * @description GET posts with Limitation.
   */
  posts(option: any): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/post?skip=' + option.skip;

    return this.http.get<any>(url, this.option({ 'Content-Type':  'application/json' })).pipe(
      tap(message => message),
      catchError(this.handleError('posts', {}))
    );
  }

    /**
   * @description GET posts with Limitation.
   */
  postDetails(id: string): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/post/' + id;

    return this.http.get<any>(url, this.option({ 'Content-Type':  'application/json' })).pipe(
      tap(message => message),
      catchError(this.handleError('posts', {}))
    );
  }

  updatePost(param: any, data: any): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/post/' + param.id;

    return this.http.put<any>(url, data, this.option({ 'enctype': 'multipart/form-data' })).pipe(
      tap(message => message),
      catchError(this.handleError('update', {}))
    );
  }

  /**
   * @description GET response from the server.
   */
  test(option: any): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/test';

    return this.http.get<any>(url).pipe(
      tap(message => message),
      catchError(this.handleError('test', {}))
    );
  }

  /**
   * @description GET version details from the server.
   */
  getVersion(option: any): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/version';

    return this.http.get<any>(url).pipe(
      tap(message => message),
      catchError(this.handleError('version', {}))
    );
  }
}
