import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth';
import { LoginForm } from '../user/model/login.model';
import { ErrorHandlingService } from './error-handling.service';
import { Store } from '@ngxs/store';
import { UserAction } from '../user/store/action';
import { UserService } from './user.service';

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
    private errorHandlingService: ErrorHandlingService,
    private store: Store,
    private userService: UserService
  ) { }

  checkAuth(): Observable<Auth> {
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
      tap(data => {
        this.userService.getUser().subscribe(
          user => {
            this.store.dispatch([
              new UserAction.Login(true),
              new UserAction.SetUser(user)
            ]);
          }
        );
      }),
      catchError(this.errorHandlingService.handleError<LoginForm>('login'))
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.authUrl}/logout`, {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).pipe(
      tap(_ => {
        this.store.dispatch(new UserAction.Logout());
      }),
      catchError(this.errorHandlingService.handleError('logout'))
    );
  }

}
