import { ILaunch } from '../models/ILaunch';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LaunchClass } from '../models/LaunchClass';

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
  launchesArray: ILaunch[] = [];

  private launchesSource = new BehaviorSubject<ILaunch[]>([]);
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

        data.map(launchJSON => {
          if (launchJSON) {
            //map to a Launch object (model)
            this.launchesArray.push(this.jsonToLaunchMapper(launchJSON));
          }
        });
        debugger;
        // save the launchesList with localStorage to persist this data
        localStorage.setItem('launchesList', JSON.stringify(this.launchesArray));

        // broadcast housesList to other components
        this.launchesSource.next(this.launchesArray);

        this.launchesArray = []; //reset memory
      });
    }
  }

  jsonToLaunchMapper(launchJSON: any): ILaunch {
    let launch: LaunchClass = new LaunchClass();

    if (launchJSON.id) {
      launch.id = launchJSON.id;
    }
    if (launchJSON.links
      && launchJSON.links.flickr
      && launchJSON.links.flickr.original
      && launchJSON.links.flickr.original.length > 0) {

      launch.img = launchJSON.links.flickr.original[0];
    }
    if (launchJSON.name) {
      launch.name = launchJSON.name;
    }
    if (launchJSON.date_utc) {
      launch.date = launchJSON.date_utc;
    }
    if (launchJSON.details) {
      launch.details = launchJSON.details;
    }
    if (launchJSON.success != null) {
      launch.success = launchJSON.success;
    }
    if (launchJSON.upcoming != null) {
      launch.upcoming = launchJSON.upcoming;
    }
    if (launchJSON.rocket) {
      launch.rocketId = launchJSON.rocket;
    }

    // fill missing object parameters by logic
    //classification
    //rocketName
    // fill rocket name by accessing rocketAPI

    // fill images of the rockets that are missing in launchesAPI,
    // using rocketAPI:

    return launch;
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
