import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import * as _ from "lodash";

let that = this;

@Injectable({ providedIn: 'root' })
export class MessageService {
  private baseUrl = 'http://localhost:3333/api';
  private token;

  constructor(private socket: Socket) { }

  emit(type, params) {
    this.token = this.getCookie('r-v-token').replace('Bearer ', '');
    this.socket.emit(type, { url: this.baseUrl + '/message', options: { method: 'POST', data: params, headers: {
      'Content-Type':  'application/json',
      'Authorization': this.token
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

  getCookie(cname) {
    var name = cname + '=';
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
    return '';
  }
}
