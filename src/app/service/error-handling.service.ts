import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  handleError<T>(operation: string, result?: T) {
    return (error: any, caught: Observable<T>): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      if (error.status === 0) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(`Backend returned code ${error.status}, body was: `, error.error.message);
      }
      return of(result as T)
    }
  }

}
