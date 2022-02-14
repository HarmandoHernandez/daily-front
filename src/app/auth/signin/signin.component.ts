import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { AuthService } from 'src/app/shared/services/auth.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  miFormulario: FormGroup = this.fb.group({
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  constructor (private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService) { }

  login (): void {
    const { email, password } = this.miFormulario.value

    this.authService.login(email, password)
      .subscribe(ok => {
        console.log(ok)
        if (ok === true) {
          void this.router.navigateByUrl('/dashboard')
        } else {
          console.error('error')
          // TODO: Alerta de error
          // Swal.fire('Error', ok, 'error')
        }
      })
  }
}
