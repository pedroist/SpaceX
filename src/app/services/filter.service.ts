import { ILaunch } from './../models/ILaunch';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  filterSuccess(launches: ILaunch[], isSuccess) {
    return launches.filter(launch => launch.success === isSuccess);
  }
}
