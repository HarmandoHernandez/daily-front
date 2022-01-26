import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { RoutineComponent } from './routine.component';
import { AddRoutineComponent } from './add-routine/add-routine.component';
import { ShowRoutineComponent } from './show-routine/show-routine.component';
import { UpdateRoutineComponent } from './update-routine/update-routine.component';
import { DeleteRoutineComponent } from './delete-routine/delete-routine.component';

const routes: Routes = [
  { path: '', component: RoutineComponent },
  { path: '**', component: RoutineComponent }
  /* { path: '',   redirectTo: '/all', pathMatch: 'full' },
  { path: 'all', component: ShowRoutineComponent },
  { path: 'add', component: AddRoutineComponent },
  { path: 'update', component: UpdateRoutineComponent },
  { path: 'delete', component: DeleteRoutineComponent } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutineRoutingModule { }
