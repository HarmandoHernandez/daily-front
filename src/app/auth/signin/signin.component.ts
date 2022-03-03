import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { AuthService } from 'src/app/shared/services/auth.service'
import { STATUS } from 'src/app/shared/enums/status.enum'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent {
  btnSigninColor = '#74b9ff'
  errors: string[] = []
  signinForm: FormGroup = this.fb.group({
    email: ['armando@gmail.com', [Validators.required, Validators.email]], // TODO: Validar con rxjs
    password: ['123456789', [Validators.required, Validators.minLength(8)]]
  })

  constructor (private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService) { }

  get isValidFormData (): boolean {
    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched()
      return false
    }
    return true
  }

  signin (): void {
    if (!this.isValidFormData) return
    const { email, password } = this.signinForm.value

    this.authService.signin(email, password)
      .subscribe(resp => {
        this.errors = []
        if (resp === null) {
          this.errors.push('Without account')
          return
        }
        if (resp.status === STATUS.SUCCESS) {
          void this.router.navigateByUrl('/cloud')
          return
        }

        if (resp.status === STATUS.ERROR && Array.isArray(resp.message)) {
          resp.message.forEach((error: { param: string, error: string }) => {
            this.errors.push(`${error.param} is ${error.error}.`)
          })
        } else {
          this.errors.push('Something went wrong, please try again later')
        }
      })
  }

  // TODO: HAcer esta funcion una util (Para sign in, signup, activity) O una directiva
  isValid (campo: string): boolean {
    return (this.signinForm.controls[campo].errors != null) && this.signinForm.controls[campo].touched
  }
}
