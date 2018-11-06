import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPageComponent } from './view/view-page/view-page.component';
import { CreatePageComponent } from './create/create-page/create-page.component';
import { EditPageComponent } from './edit/edit-page/edit-page.component';
import { WorkingDayResolver } from './edit/workingday-resolver/workingday.resolver';

const routes: Routes = [
  { path: 'create', component: CreatePageComponent },
  { path: 'view', component: ViewPageComponent },
  { path: 'edit', children: [{
      path: ':date',
      component: EditPageComponent,
      resolve: {
        workingDay: WorkingDayResolver
      }
    }]
  },
  { path: '', redirectTo: 'view', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
