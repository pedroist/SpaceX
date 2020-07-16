import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RocketService {
  url: string = 'https://api.spacexdata.com/v4';

  constructor(private http: HttpClient) { }

  /**GET /rockets/:id
 * Get Rocket by id
*/
  getRocketByIdHttpRequest(id: string): Observable<any> {
    let data = this.http
      .get(`${this.url}/rockets/${id}`)
      .pipe(catchError(this.handleError));
    return data;
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
