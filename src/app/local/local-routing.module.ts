import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
/* import { ListComponent } from './../shared/routine/list/list.component'
import { ActivityComponent } from './../shared/routine/activity/activity.component'
 */
import { LocalRoutineComponent } from './local-routine/local-routine.component'
import { LocalActivityComponent } from './local-activity/local-activity.component'

const routes: Routes = [{
  path: '',
  children: [
    { path: '', component: LocalRoutineComponent },
    { path: 'activity/:id', component: LocalActivityComponent },
    { path: '**', redirectTo: 'routine', pathMatch: 'full' }
  ]
}
/* { path: 'routine', component: RoutineComponent },
{ path: 'activity/:id', component: ActivityComponent } */
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalRoutingModule { }
