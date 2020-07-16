import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LaunchesComponent } from './pages/launches/launches.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LaunchesCardListComponent } from './components/launches-card-list/launches-card-list.component';
import { LaunchCardComponent } from './components/launch-card/launch-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LaunchesComponent,
    NavbarComponent,
    LaunchesCardListComponent,
    LaunchCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
