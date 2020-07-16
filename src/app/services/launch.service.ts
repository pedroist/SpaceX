import { Launch } from './../models/Launch';
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
export class LaunchService {
  url: string = 'https://api.spacexdata.com/v4';

  private launchesSource = new BehaviorSubject<Launch[]>([]);
  launchesReference = this.launchesSource.asObservable();

  constructor(private http: HttpClient) { }

  /*---HTTP REQUESTS-------------------------------------*/

  /**GET /launches
   * Get All Launches
  */
  getLaunchesHttpRequest(): Observable<any> {
    let data = this.http
      .get(`${this.url}/launches`)
      .pipe(catchError(this.handleError));
    return data;
  }

  /*---END OF HTTP REQUESTS-------------------------------------*/

  getLaunchesInitialization() {

    // checking if LaunchesList is already saved with localStorage
    let launches = JSON.parse(localStorage.getItem('launchesList'));

    if (launches) {
      this.launchesSource.next(launches);
    } else {
      this.getLaunchesHttpRequest().subscribe(data => {

        data.map(launch => {
          if (launch) {
            //map to a Launch object (model)
            this.jsonToLaunchMapper(launch);
          }
        });

        // save the launchesList with localStorage to persist this data
        localStorage.setItem('launchesList', JSON.stringify(data.launches));

        // broadcast housesList to other components
        this.launchesSource.next(data.launches);
      });
    }
  }

  jsonToLaunchMapper(launch: any) {
    console.log("Mapper: ", launch);

    //if(launch.)

    //fill missing object parameters by logic
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
