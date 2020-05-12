import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PersonsComponent } from './persons/persons.component';
import { FamilyTreeComponent } from './family-tree/family-tree.component';

// The routing module describes all of the routes the app has, which are the subpaths you can enter into the URL
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'family-tree',
    component: FamilyTreeComponent
  },
  {
    path: 'family-tree/:id',
    component: FamilyTreeComponent
  },
  {
    path: 'persons',
    component: PersonsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
