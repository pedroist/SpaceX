import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* Import pages */
import { LaunchesComponent } from './pages/launches/launches.component';

const routes: Routes = [
  { path: '', component: LaunchesComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }