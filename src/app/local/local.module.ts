import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LocalRoutingModule } from './local-routing.module'
import { LocalComponent } from './local.component'
import { LocalRoutineComponent } from './local-routine/local-routine.component'
import { LocalActivityComponent } from './local-activity/local-activity.component'

import { RoutineModule } from './../routine/routine.module'

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
  ]
})
export class LocalModule { }
