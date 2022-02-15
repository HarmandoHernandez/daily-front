import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { AuthService } from 'src/app/shared/services/auth.service'
import { STATUS } from 'src/app/shared/enums/status.enum'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  btnSignupColor = '#74b9ff'
  errors: string[] = []
  signupForm: FormGroup = this.fb.group({
    name: ['Test Uno', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    email: ['test1@test', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(100)]],
    password: ['12345678', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]]
  })

  constructor (private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService) { }

  get isValidFormData (): boolean {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched()
      return false
    }
    return true
  }

  signup (): void {
    if (!this.isValidFormData) return
    const { name, email, password } = this.signupForm.value

    this.authService.signup(name, email, password)
      .subscribe(({ status, message }) => {
        if (status === STATUS.SUCCESS) {
          void this.router.navigateByUrl('/cloud')
        }
        if (status === STATUS.ERROR && Array.isArray(message)) {
          this.errors = []
          message.forEach(error => {
            this.errors.push(`${error.param} is ${error.error}.`)
          })
        }
      })
  }

  isValid (campo: string): boolean {
    return (this.signupForm.controls[campo].errors != null) && this.signupForm.controls[campo].touched
  }
}
