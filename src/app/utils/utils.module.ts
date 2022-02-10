import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BtnComponent } from './btn/btn.component'
import { DefineColorDirective } from './directives/color.directive'
import { MessageDirective } from './directives/message.directive'

@NgModule({
  declarations: [
    BtnComponent,
    DefineColorDirective,
    MessageDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BtnComponent
  ]
})
export class UtilsModule { }
