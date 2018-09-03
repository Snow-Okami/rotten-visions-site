import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiurl = 'http://localhost:3333/api';

  constructor(private http: HttpClient) { }

  login(data): Observable<HttpResponse<any>> {
    let url = this.apiurl + '/auth/login';

    return this.http.post<any>(url, data).pipe(
      tap(message => message),
      catchError(this.handleError('login', {}))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      Object.assign(result, {'message': error.error})
      return of(result as T);
    };
  }
}
