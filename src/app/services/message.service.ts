import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import * as _ from "lodash";

let that = this;

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:3333/api';

  constructor(private socket: Socket) { }

  emit(type, params) {
    this.socket.emit(type, { url: this.baseUrl + '/message', options: { method: 'POST', data: params, headers: {
      'Content-Type':  'application/json',
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiaGlzZWsxNDg2IiwiZW1haWwiOiJhYmhpc2VrQGNhcGl0YWxudW1iZXJzLmNvbSIsImNyZWF0ZWRBdCI6IjIwMTgtMDgtMjVUMTc6NTE6NTkuMDEyWiIsImp3dFZhbGlkYXRlZEF0IjoiMjAxOC0wOC0yNVQxNzo1MTo1OS4wMTJaIiwiaWF0IjoxNTM1MjE5NTIxfQ.2jRRPG7SDjo8sE8NH9lar54Rk77S29NO_SUxPN55R3k'
    }}});
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.error}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
