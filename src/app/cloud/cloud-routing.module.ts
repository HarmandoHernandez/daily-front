import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CloudComponent } from './cloud.component'
import { CloudActivityComponent } from './cloud-activity/cloud-activity.component'
import { CloudRoutineComponent } from './cloud-routine/cloud-routine.component'

const routes: Routes = [{
  path: '',
  component: CloudComponent,
  children: [
    { path: '', component: CloudRoutineComponent },
    { path: 'activity/:id', component: CloudActivityComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CloudRoutingModule { }
