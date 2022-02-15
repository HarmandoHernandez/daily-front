import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { AuthRoutingModule } from './auth-routing.module'
import { AuthComponent } from './auth.component'
import { SigninComponent } from './signin/signin.component'
import { SignupComponent } from './signup/signup.component'
import { UtilsModule } from 'src/app/utils/utils.module'

@NgModule({
  declarations: [
    AuthComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    UtilsModule
  ]
})
export class AuthModule { }
