import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private authUrl = `${environment.apiUrl}/api/auth`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  checkAuth() {
    return this.http.get<Auth>(this.authUrl, this.httpOptions).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError<Auth>('checkAuth'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any, caught: Observable<T>): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      if (error.status === 0) {
        console.error('An error occurred:', error.error.message);
      // サーバー側から返却されるエラー
      } else {
        console.error(`Backend returned code ${error.status}, body was: `, error.error.message);
      }
      return of(result as T)
    }
  }


}
