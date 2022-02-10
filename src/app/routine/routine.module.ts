import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { UtilsModule } from 'src/app/utils/utils.module'
import { ActivityComponent } from './activity/activity.component'
import { RoutineComponent } from './routine/routine.component'

@NgModule({
  declarations: [
    ActivityComponent,
    RoutineComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UtilsModule
  ],
  exports: [
    ActivityComponent,
    RoutineComponent
  ]
})
export class RoutineModule { }
