import { ILaunch } from '../../models/ILaunch';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-launch-card',
  templateUrl: './launch-card.component.html',
  styleUrls: ['./launch-card.component.scss']
})
export class LaunchCardComponent implements OnInit {
  @Input() launch: ILaunch;
  constructor() { }

  ngOnInit() {

  }

}
