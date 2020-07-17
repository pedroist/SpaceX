import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* Import pages */
import { LaunchesComponent } from './pages/launches/launches.component';
import { RocketsComponent } from './pages/rockets/rockets.component';

const routes: Routes = [
  { path: '', component: LaunchesComponent },
  { path: 'rockets', component: RocketsComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }