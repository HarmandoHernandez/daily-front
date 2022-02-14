import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { AuthService } from 'src/app/shared/services/auth.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  miFormulario: FormGroup = this.fb.group({
    name: ['Test 4', [Validators.required]],
    email: ['test4@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  constructor (private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService) { }

  registro (): void {
    const { name, email, password } = this.miFormulario.value

    this.authService.registro(name, email, password)
      .subscribe(ok => {
        if (ok === true) {
          void this.router.navigateByUrl('/dashboard')
        } else {
          // Definir mensajes en el front. Por posibles cambios de idioma
          // Definir en back. Mensajes espesificos y concretos
          console.error(ok.status, ok.message)
          // TODO: Alerta de error
          // Swal.fire('Error', ok, 'error')
        }
      })
  }
}
