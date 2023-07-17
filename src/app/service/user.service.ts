import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../user/model/login.model';
import { Observable, catchError, tap } from 'rxjs';
import { User } from '../models/user';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = `${environment.apiUrl}/api/user`;
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

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.userUrl}`, {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).pipe(
      catchError(this.errorHandlingService.handleError<User>('getUser'))
    );
  }

}
