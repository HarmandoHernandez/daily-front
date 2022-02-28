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
    email: ['', [Validators.required, Validators.email]], // TODO: Validar con rxjs
    password: ['', [Validators.required, Validators.minLength(8)]]
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
      .subscribe(({ status, message }) => {
        this.errors = []
        console.log(message)
        if (status === STATUS.SUCCESS) {
          void this.router.navigateByUrl('/cloud')
        }
        if (status === STATUS.ERROR && Array.isArray(message)) {
          message.forEach(error => {
            this.errors.push(`${error.param} is ${error.error}.`)
          })
        } else {
          this.errors.push('Something went wrong, please try again later.')
        }
      })
  }

  // TODO: HAcer esta funcion una util (Para sign in, signup, activity) O una directiva
  isValid (campo: string): boolean {
    return (this.signinForm.controls[campo].errors != null) && this.signinForm.controls[campo].touched
  }
}
