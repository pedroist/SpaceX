import { ILaunch } from '../../models/ILaunch';
import { Component, OnInit } from '@angular/core';
import { LaunchService } from '../../services/launch.service';
import { FilterService } from '../../services/filter.service';
import { Period } from '../../Constants';
import FuzzySearch from 'fuzzy-search'; // Or: var FuzzySearch = require('fuzzy-search');


@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss']
})
export class LaunchesComponent implements OnInit {
  launchesList: ILaunch[] = [];

  searchResults: ILaunch[] = [];
  searchTerm: string;

  period: string = Period.ALL;
  showOnlySuccess: boolean = true;
  showOnlySuccessActive: boolean = false;

  constructor(
    private launchService: LaunchService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.launchService.getLaunchesInitialization(Period.ALL);

    //launchesList when fetched or after get w/ localstorage is broadcasted here and to other components
    this.launchService.launchesReference.subscribe(launches => {
      this.launchesList = [];
      this.launchesList = launches;

      if (this.period === Period.PAST) {
        //Everytime we choose Past we force the filter success to get back to true
        this.showOnlySuccess = true;
        this.showOnlySuccessActive = true;
      } else {
        this.showOnlySuccessActive = false;
      }
      if (this.searchTerm) {
        this.executeSearch();
      }
    });
  }

  onPeriodFilterChange(period: string) {
    this.period = period;
    //this.searchTerm = "";
    this.searchResults = [];
    this.launchService.getLaunchesInitialization(this.period);
  }

  onSuccessFilterChange(isSuccess: boolean) {
    this.showOnlySuccess = isSuccess;
  }

  onSearchTermChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.executeSearch();
  }

  executeSearch() {
    const searcher = new FuzzySearch(this.launchesList, ['name'], {
      caseSensitive: false,
    });
    this.searchResults = searcher.search(this.searchTerm);

  }
}
