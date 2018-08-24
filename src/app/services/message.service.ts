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
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiaGlzZWsxNDg2IiwiZW1haWwiOiJhYmhpc2VrQGNhcGl0YWxudW1iZXJzLmNvbSIsImNyZWF0ZWRBdCI6IjIwMTgtMDgtMjNUMDQ6NDU6MjEuNjkwWiIsImp3dFZhbGlkYXRlZEF0IjoiMjAxOC0wOC0yM1QwNDo0NToyMS42OTBaIiwiaWF0IjoxNTM0OTk5NTIyfQ.nWqwjCqrwL5aGRLc-r-8znuuqQmXc5z76wtVX65OmWo'
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
