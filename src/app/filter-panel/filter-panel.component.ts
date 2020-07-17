import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Period } from '../Constants';


@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {
  periodFilter: string = "All";
  periodOptions: string[] = [Period.ALL, Period.PAST, Period.UPCOMING];

  @Output() periodFilterOut: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onPeriodChange() {
    this.periodFilterOut.emit(this.periodFilter);
  }
}
