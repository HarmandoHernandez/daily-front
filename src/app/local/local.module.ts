import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LocalRoutingModule } from './local-routing.module'
import { LocalComponent } from './local.component'
import { LocalRoutineComponent } from './local-routine/local-routine.component'
import { LocalActivityComponent } from './local-activity/local-activity.component'
import { RoutineModule } from 'src/app/routine/routine.module'
import { UtilsModule } from 'src/app/utils/utils.module'

@NgModule({
  declarations: [
    LocalComponent,
    LocalRoutineComponent,
    LocalActivityComponent
  ],
  imports: [
    CommonModule,
    LocalRoutingModule,
    RoutineModule,
    UtilsModule
  ]
})
export class LocalModule { }
