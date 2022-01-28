import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LocalRoutineComponent } from './local-routine/local-routine.component'
import { LocalActivityComponent } from './local-activity/local-activity.component'

const routes: Routes = [{
  path: '',
  children: [
    { path: '', component: LocalRoutineComponent },
    { path: 'activity/:id', component: LocalActivityComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalRoutingModule { }
