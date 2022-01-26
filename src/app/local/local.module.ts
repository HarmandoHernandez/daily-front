import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LocalRoutingModule } from './local-routing.module'
import { LocalComponent } from './local.component'
import { RoutineModule } from './../routine/routine.module'

@NgModule({
  declarations: [
    LocalComponent
  ],
  imports: [
    CommonModule,
    LocalRoutingModule,
    RoutineModule
  ]
})
export class LocalModule { }
