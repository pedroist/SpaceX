import { ILaunch } from '../../models/ILaunch';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-launches-card-list',
  templateUrl: './launches-card-list.component.html',
  styleUrls: ['./launches-card-list.component.scss']
})

export class LaunchesCardListComponent implements OnInit {

  @Input() launchesList: ILaunch[];
  constructor() { }

  ngOnInit() {
  }

}
