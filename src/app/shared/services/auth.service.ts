import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
// import { HttpParams } from '@angular/common/http';
import { of, Observable, Subject } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment'

import { GeneralFormat } from 'src/app/shared/models/Auth.model'
import { Usuario } from 'src/app/shared/models/Usuario.model'
import { STATUS } from '../enums/status.enum'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = environment.API_URL
  private readonly user$ = new Subject<Usuario>()
  private readonly tokenItem = 'token'

  constructor (private readonly http: HttpClient) { }

  signup (name: string, email: string, password: string): Observable<GeneralFormat> {
    const url = `${this.baseUrl}/auth/register`
    const body = { email, password, name }

    return this.http.post<GeneralFormat>(url, body)
      .pipe(
        tap(resp => {
          if (resp.status === STATUS.SUCCESS && !Array.isArray(resp.message)) {
            localStorage.setItem(this.tokenItem, resp.message.token)
          }
        }),
        map(resp => resp),
        catchError(({ error }) => {
          return of(error)
        })
      )
  }

  // GeneralFormat
  signin (email: string, password: string): Observable<GeneralFormat> {
    const url = `${this.baseUrl}/auth`
    const body = { email, password }

    // GeneralFormat
    return this.http.post<GeneralFormat>(url, body) // { observe: 'response' }
      .pipe(
        tap(resp => {
          console.log(resp)
          if (resp !== null && resp.status === STATUS.SUCCESS && !Array.isArray(resp.message)) {
            localStorage.setItem(this.tokenItem, resp.message.token)
          }
        }),
        map(resp => resp),
        catchError(error => {
          return of(error)
        })
      )
  }

  get validToken (): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`

    const token = localStorage.getItem(this.tokenItem) ?? ''
    if (token === '') return of(false)

    /* const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')

    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params } ) */

    const headers = new HttpHeaders()
      .set('x-token', token)

    return this.http.get<GeneralFormat>(url, { headers })
      .pipe(
        map(({ status, message }) => {
          if (!Array.isArray(message)) {
            localStorage.setItem(this.tokenItem, message.token)
            this.user$.next({ name: message.name ?? '', uid: message.uid ?? '' })
          }
          return (status === STATUS.SUCCESS)
        }),
        catchError(() => of(false))
      )
  }

  logout (): void {
    this.user$.next({ name: '', uid: '' })
    localStorage.removeItem(this.tokenItem)
  }

  get user (): Observable<Usuario> {
    return this.user$.asObservable()
  }
}
