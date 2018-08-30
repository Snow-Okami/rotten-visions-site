import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as _ from "lodash"

@Injectable({ providedIn: 'root' })
export class HttpService {
  private baseUrl = 'http://localhost:3333/api';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiaGlzZWsxNDg2IiwiZW1haWwiOiJhYmhpc2VrQGNhcGl0YWxudW1iZXJzLmNvbSIsImNyZWF0ZWRBdCI6IjIwMTgtMDgtMjNUMDQ6NDU6MjEuNjkwWiIsImp3dFZhbGlkYXRlZEF0IjoiMjAxOC0wOC0zMFQwOTowNjoxNC41NjlaIiwiaWF0IjoxNTM1NjE5OTc0fQ.0KPIc3-Oum29UQI93cmIoX6rpENIjA7dVS1dmhdlc2k'
    })
  };

  private normalHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  login(data): Observable<any> {
    let url = this.baseUrl + '/auth/login';
    return this.http.post<any>(url, data, this.normalHttpOptions).pipe(
      tap(message => message),
      catchError(this.handleError('login', {}))
    );
  }

  sendMessage(data): Observable<any> {
    let url = this.baseUrl + '/message';
    return this.http.post<any>(url, data, this.httpOptions).pipe(
      tap(message => message._id = ''),
      catchError(this.handleError('sendMessage', {}))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: better job of transforming error for user consumption
      Object.assign(result, {'message': error.error})

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
