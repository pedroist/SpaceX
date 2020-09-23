import { ILaunch } from '../../models/ILaunch';
import { Component, OnInit, Input } from '@angular/core';
import { RocketService } from '../../services/rocket.service';

import * as _ from "lodash";

@Component({
  selector: 'app-launch-card',
  templateUrl: './launch-card.component.html',
  styleUrls: ['./launch-card.component.scss']
})
export class LaunchCardComponent implements OnInit {
  @Input() launch: ILaunch;
  currentStyles = {};

  constructor(private rocketService: RocketService) { }

  ngOnInit() {

    this.setCurrentStyles();

    this.rocketService.getRocketByIdHttpRequest(this.launch.rocketId)
      .subscribe(rocket => {
        // fill rocket name and missing rocket images by accessing rocketAPI
        if (rocket) {
          if (rocket.name) {
            this.launch.rocketName = rocket.name;
          }
          if (!this.launch.img && rocket.flickr_images && rocket.flickr_images.length > 0) {
            //since the most of the rockets have the same first image we will get a random one from the list
            let randIndex = _.random(0, rocket.flickr_images.length - 1);

            this.launch.img = rocket.flickr_images[randIndex];
          }
          //Update the styles to set the img as background
          this.setCurrentStyles();
        }
      })
  }

  setCurrentStyles() {
    this.currentStyles = {
      'background': (this.launch && this.launch.img) ? `url(${this.launch.img}) 35% 50% / cover` : ''
    }
  }
}
