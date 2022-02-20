import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BtnComponent } from './btn/btn.component'
import { DefineColorDirective } from './directives/color.directive'
import { MessageDirective } from './directives/message.directive'
import { ModalComponent } from './modal/modal.component'
import { HourPipe } from './pipes/hour.pipe'
import { MinPipe } from './pipes/min.pipe'

@NgModule({
  declarations: [
    BtnComponent,
    DefineColorDirective,
    MessageDirective,
    ModalComponent,
    HourPipe,
    MinPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BtnComponent,
    ModalComponent,
    HourPipe,
    MinPipe
  ]
})
export class UtilsModule { }
