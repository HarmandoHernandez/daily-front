import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivityComponent } from './activity/activity.component'
import { RoutineComponent } from './routine/routine.component'

import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    ActivityComponent,
    RoutineComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ActivityComponent,
    RoutineComponent
  ]
})
export class RoutineModule { }
