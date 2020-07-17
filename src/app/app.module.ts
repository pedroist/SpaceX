import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LaunchesComponent } from './pages/launches/launches.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LaunchesCardListComponent } from './components/launches-card-list/launches-card-list.component';
import { LaunchCardComponent } from './components/launch-card/launch-card.component';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    LaunchesComponent,
    NavbarComponent,
    LaunchesCardListComponent,
    LaunchCardComponent,
    FilterPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
