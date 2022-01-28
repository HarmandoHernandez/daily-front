import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LocalRoutingModule } from './local-routing.module'
import { LocalComponent } from './local.component'
import { LocalRoutineComponent } from './local-routine/local-routine.component'
import { LocalActivityComponent } from './local-activity/local-activity.component'

import { RoutineModule } from './../routine/routine.module'
/* import { RoutineComponent } from './../shared/routine/routine.component'
import { ActivityComponent } from './../shared/activity/activity.component'
 */
/* import { RoutineActivityComponent } from './../shared/routine/routine-activity/routine-activity.component'
import { RoutineListComponent } from './../shared/routine/routine-list/routine-list.component'
 */
/* import { ActivityComponent as ActivityComponentTool } from './../routine/activity/activity.component'
import { RoutineComponent as RoutineComponentTool } from './../routine/routine/routine.component'
 */
@NgModule({
  declarations: [
    LocalComponent,
    LocalRoutineComponent,
    LocalActivityComponent
  ],
  imports: [
    CommonModule,
    LocalRoutingModule,
    RoutineModule
    /* ActivityComponent,
    RoutineComponent */
    /*  ActivityComponentTool,
    RoutineComponentTool */
  ]
})
export class LocalModule { }
