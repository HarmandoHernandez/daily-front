import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BtnComponent } from './btn/btn.component'
import { DefineColorDirective } from './directives/color.directive'
import { MessageDirective } from './directives/message.directive'
import { ModalComponent } from './modal/modal.component'

@NgModule({
  declarations: [
    BtnComponent,
    DefineColorDirective,
    MessageDirective,
    ModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BtnComponent,
    ModalComponent
  ]
})
export class UtilsModule { }
