import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPageComponent } from './view/view-page/view-page.component';
import { CreatePageComponent } from './create/create-page/create.component';

const routes: Routes = [
  { path: 'create', component: CreatePageComponent },
  { path: 'view', component: ViewPageComponent },
  { path: '', redirectTo: 'view', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
