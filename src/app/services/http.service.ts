import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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

  login(data): Observable<HttpResponse<any>> {
    let url = this.baseUrl + '/auth/login';

    // return this.http.post<any>(url, data, { observe: 'response' });
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

  getChats(username): Observable<HttpResponse<any>> {
    let url = this.baseUrl + '/user/' + username + '/chats';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.getCookie('r-v-token').replace('Bearer ', '')
      })
    };

    return this.http.get<any>(url, this.httpOptions).pipe(
      tap(message => message),
      catchError(this.handleError('get chats', {}))
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

  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }
}
