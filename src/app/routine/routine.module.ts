import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivityComponent } from './activity/activity.component'
import { RoutineComponent } from './routine/routine.component'

@NgModule({
  declarations: [
    ActivityComponent,
    RoutineComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ActivityComponent,
    RoutineComponent
  ]
})
export class RoutineModule { }
