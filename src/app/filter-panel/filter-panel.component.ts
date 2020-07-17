import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Period } from '../Constants';
import { MatSlideToggleChange } from '@angular/material';


@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {
  periodFilter: string = Period.ALL;
  periodOptions: string[] = [Period.ALL, Period.PAST, Period.UPCOMING];

  slideToggleButtonColor: string = "primary";
  isSuccess: boolean = true;
  showToggleButton: boolean = false;

  searchTerm: string;

  @Output() periodFilterOut: EventEmitter<string> = new EventEmitter();
  @Output() successFilterOut: EventEmitter<boolean> = new EventEmitter();
  @Output() searchTermOut: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onSearchInputChange() {
    this.searchTermOut.emit(this.searchTerm);
  }

  onPeriodChange() {
    if (this.periodFilter === Period.ALL || this.periodFilter === Period.UPCOMING) {
      this.showToggleButton = false;
    }
    if (this.periodFilter === Period.PAST) {
      this.showToggleButton = true;
      this.isSuccess = true
    }
    this.periodFilterOut.emit(this.periodFilter);
  }

  toggle(event: MatSlideToggleChange) {
    // Here we emit to the Launches Component the value of the matsidetoggle (boolean for success launches or not)
    this.successFilterOut.emit(event.checked);
  }
}
