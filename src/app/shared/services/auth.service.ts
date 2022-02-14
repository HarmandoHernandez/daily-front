import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { of, Observable } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment'

import { AuthResponse, Usuario } from 'src/app/shared/models/Auth.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = environment.API_URL
  private _usuario!: Usuario

  get usuario (): Usuario {
    return { ...this._usuario }
  }

  constructor (private readonly http: HttpClient) { }

  registro (name: string, email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/auth/register`
    const body = { email, password, name }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          console.log(resp)
          /* if (ok) {
            localStorage.setItem('token', token ?? '')
          } */
        }),
        map(resp => resp.ok),
        catchError(err => {
          return of(err.error)
        })
      )
  }

  login (email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/auth`
    const body = { email, password }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token ?? '')
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  validarToken (): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') ?? '')

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {
          localStorage.setItem('token', resp.token ?? '')
          this._usuario = {
            name: resp.name ?? '',
            uid: resp.uid ?? '',
            email: resp.email ?? ''
          }

          return resp.ok
        }),
        catchError(() => of(false))
      )
  }

  logout (): void {
    localStorage.clear()
  }
}
