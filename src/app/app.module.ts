import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LaunchesComponent } from './pages/launches/launches.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LaunchesCardListComponent } from './components/launches-card-list/launches-card-list.component';
import { LaunchCardComponent } from './components/launch-card/launch-card.component';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { ShowOnlySuccessPipe } from './pipes/show-only-success.pipe';
import { RocketsComponent } from './pages/rockets/rockets.component';

@NgModule({
  declarations: [
    AppComponent,
    LaunchesComponent,
    NavbarComponent,
    LaunchesCardListComponent,
    LaunchCardComponent,
    FilterPanelComponent,
    ShowOnlySuccessPipe,
    RocketsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
