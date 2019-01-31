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

  private option = {
    headers: new HttpHeaders({
      'enctype': 'multipart/form-data'
    })
  };

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      Object.assign(result, {'message': error.error})
      return of(result as T);
    };
  }

  /**
   * @description GET posts with Limitation.
   */
  posts(option): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/post?skip=' + option.skip;

    return this.http.get<any>(url).pipe(
      tap(message => message),
      catchError(this.handleError('posts', {}))
    );
  }

  post(param: any): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/post/' + param.id;

    return this.http.get<any>(url).pipe(
      tap(message => message),
      catchError(this.handleError('post', {}))
    );
  }

}
