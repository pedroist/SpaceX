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

  constructor() { }
}
