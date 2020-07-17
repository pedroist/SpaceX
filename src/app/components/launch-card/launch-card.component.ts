import { ILaunch } from '../../models/ILaunch';
import { Component, OnInit, Input } from '@angular/core';
import { RocketService } from '../../services/rocket.service';

@Component({
  selector: 'app-launch-card',
  templateUrl: './launch-card.component.html',
  styleUrls: ['./launch-card.component.scss']
})
export class LaunchCardComponent implements OnInit {
  @Input() launch: ILaunch;

  constructor(private rocketService: RocketService) { }

  ngOnInit() {
    this.rocketService.getRocketByIdHttpRequest(this.launch.rocketId)
      .subscribe(rocket => {
        // fill rocket name and missing rocket images by accessing rocketAPI
        if (rocket) {
          if (rocket.name) {
            this.launch.rocketName = rocket.name;
          }
          if (!this.launch.img && rocket.flickr_images && rocket.flickr_images.length > 0) {
            this.launch.img = rocket.flickr_images[0];
          }
        }
      })
  }

}
