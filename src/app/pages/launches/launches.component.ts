import { ILaunch } from '../../models/ILaunch';
import { Component, OnInit } from '@angular/core';
import { LaunchService } from '../../services/launch.service';
import { Period } from '../../Constants';

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss']
})
export class LaunchesComponent implements OnInit {
  launchesList: ILaunch[] = [];
  period: string = Period.ALL;

  constructor(private launchService: LaunchService) { }

  ngOnInit() {
    this.launchService.getLaunchesInitialization(Period.ALL);

    //launchesList when fetched or after get w/ localstorage is broadcasted here and to other components
    this.launchService.launchesReference.subscribe(launches => {
      console.log(launches);
      this.launchesList = [];
      this.launchesList = launches;
    });
  }

  onPeriodFilterChange(period: string) {
    this.period = period;
    this.launchService.getLaunchesInitialization(period);
  }

}
