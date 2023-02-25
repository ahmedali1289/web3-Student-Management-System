import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  postMethod(link: string, data: any, token: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer token`,
      'Content-Type': 'application/json',
    });

    return this.http.post(link,{}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(error.error);
    } else {
      console.error(error.error);
    }
    return throwError(error.error);
  }
}
