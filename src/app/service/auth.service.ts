import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth';
import { LoginForm } from '../user/model/login.model';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = `${environment.apiUrl}/api/auth`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true'
    })
  }

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) { }

  checkAuth() {
    return this.http.get<Auth>(`${this.authUrl}/verify`, {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).pipe(
      tap(data => console.log(data)), //todo debug用
      catchError(this.errorHandlingService.handleError<Auth>('checkAuth'))
    );
  }

  login(loginForm: LoginForm): Observable<LoginForm> {
    return this.http.post<LoginForm>(`${this.authUrl}/login`, loginForm, this.httpOptions).pipe(
      tap(data => console.log(data)),
      catchError(this.errorHandlingService.handleError<LoginForm>('login'))
    );
  }

}
