import { Launch } from './../../models/Launch';
import { Component, OnInit } from '@angular/core';
import { LaunchService } from '../../services/launch.service';

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss']
})
export class LaunchesComponent implements OnInit {
  launchesList: Launch[] = [];

  constructor(private launchService: LaunchService) { }

  ngOnInit() {
    this.launchService.getLaunchesInitialization();

    //launchesList when fetched or after get w/ localstorage is broadcasted here and to other components
    this.launchService.launchesReference.subscribe(launches => {
      this.launchesList = launches;
    });
  }

}
