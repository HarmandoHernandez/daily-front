import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CloudRoutingModule } from './cloud-routing.module'
import { CloudComponent } from './cloud.component'
import { CloudActivityComponent } from './cloud-activity/cloud-activity.component'
import { CloudRoutineComponent } from './cloud-routine/cloud-routine.component'

@NgModule({
  declarations: [
    CloudComponent,
    CloudActivityComponent,
    CloudRoutineComponent
  ],
  imports: [
    CommonModule,
    CloudRoutingModule
  ]
})
export class CloudModule { }
