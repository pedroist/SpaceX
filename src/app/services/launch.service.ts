import { RocketService } from './rocket.service';
import { Classification, SUCCESS } from './../Constants';
import { ILaunch } from '../models/ILaunch';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LaunchClass } from '../models/LaunchClass';
import { Period } from '../Constants';

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

  constructor(
    private http: HttpClient,
    private rocketService: RocketService
  ) { }

  /*---HTTP REQUESTS-------------------------------------*/

  /**GET /launches or GET /launches/past or GET /launches/upcoming
   * Get All Launches or Past Launches or Upcoming Launches
  */
  getLaunchesHttpRequest(period: string): Observable<any> {
    let url;
    switch (period) {
      case Period.ALL:
        url = `${this.url}/launches`;
        break;
      case Period.PAST:
        url = `${this.url}/launches/past`;
        break;
      case Period.UPCOMING:
        url = `${this.url}/launches/upcoming`;
        break;
      default:
        url = `${this.url}/launches`;
        break;
    }

    let data = this.http
      .get(url)
      .pipe(catchError(this.handleError));
    return data;
  }

  /*---END OF HTTP REQUESTS-------------------------------------*/

  getLaunchesInitialization(period: string) {
    this.launchesArray = []; //Reset array before adding new objects. (In case Period Filter changed)

    this.getLaunchesHttpRequest(period).subscribe(data => {
      data.map(launchJSON => {
        if (launchJSON) {
          //map to a Launch object (model)
          this.launchesArray.push(this.jsonToLaunchMapper(launchJSON));
        }
      });
      // broadcast housesList to other components
      this.launchesSource.next(this.launchesArray);
    });

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

    /* fill missing object parameters by logic*/
    //classification:
    if (launch.success) {
      launch.classification = Classification.SUCCESS;
    } else if (launch.upcoming) {
      launch.classification = Classification.UPCOMING;
    } else {
      launch.classification = Classification.FAILED;
    }

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
