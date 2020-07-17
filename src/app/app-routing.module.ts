import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* Import pages */
import { LaunchesComponent } from './pages/launches/launches.component';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';

const routes: Routes = [
  { path: '', component: FilterPanelComponent },
  { path: 'rockets', component: LaunchesComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }