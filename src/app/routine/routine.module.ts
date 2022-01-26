import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// import { RoutineRoutingModule } from './routine-routing.module';
import { RoutineComponent } from './routine.component'
import { AddRoutineComponent } from './add-routine/add-routine.component'
import { ShowRoutineComponent } from './show-routine/show-routine.component'
import { UpdateRoutineComponent } from './update-routine/update-routine.component'
import { DeleteRoutineComponent } from './delete-routine/delete-routine.component'

@NgModule({
  declarations: [
    RoutineComponent,
    AddRoutineComponent,
    ShowRoutineComponent,
    UpdateRoutineComponent,
    DeleteRoutineComponent
  ],
  imports: [
    CommonModule
    /* RoutineRoutingModule */
  ],
  exports: [
    RoutineComponent,
    AddRoutineComponent,
    ShowRoutineComponent,
    UpdateRoutineComponent,
    DeleteRoutineComponent
  ]
})
export class RoutineModule { }
