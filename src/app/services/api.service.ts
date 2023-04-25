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
    let header = {
      "Content-Type": "application/json",
      Accept: "application/json",

    };
    let headerT = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      Accept: "application/json",
    };
    return this.http.post(link,JSON.stringify(data),
    {
      headers: !token ? header : headerT,
    }).pipe(
      catchError(this.handleError)
    );
  }
  getMethod(link: string, token: boolean): Observable<any> {
    let header = {
      "Content-Type": "application/json",
      Accept: "application/json",

    };
    let headerT = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      Accept: "application/json",
    };
    return this.http.get(link,
    {
      headers: !token ? header : headerT,
    }).pipe(
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
