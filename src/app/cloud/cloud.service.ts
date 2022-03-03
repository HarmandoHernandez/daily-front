import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Activity } from 'src/app/shared/models/Activity.model'
import { environment } from 'src/environments/environment'
import { catchError, map, tap } from 'rxjs/operators'
import { AuthService } from '../shared/services/auth.service'
import { Observable, of, Subject } from 'rxjs'
import { GeneralFormat } from '../shared/models/Auth.model'

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  private readonly baseUrl: string = environment.API_URL
  private readonly tokenItem = 'token'
  readonly url = `${this.baseUrl}/activity`

  private readonly activities$ = new Subject<Activity[]>()
  activities: Activity[] = []

  constructor (private readonly http: HttpClient,
    private readonly authService: AuthService) {
    this.getUser()
  }

  getUser (): void {
    this.authService.validToken.subscribe()
    this.authService.user.subscribe(user => {
      if (user.uid.length > 0) {
        const url = `${this.baseUrl}/user/${user.uid}`
        this.http.get<any>(url).pipe(
          map(resp => resp.message.activities)
        ).subscribe(activities => {
          this.activities = activities
          this.activities$.next(activities)
        })
      }
    })
  }

  refersh (): void {
    this.activities$.next(this.activities)
  }

  get routine (): Observable<Activity[]> {
    return this.activities$.asObservable()
  }

  findActivity (id: string): Activity | undefined {
    // TODO: 1st Buscar en local
    // TODO: 2nd Buscar en api, si esta vacia la lista local
    return this.activities.find(activity => activity.id === id)
  }

  addActivity (newActivity: Activity): Observable<GeneralFormat> {
    const body = newActivity
    const token = localStorage.getItem(this.tokenItem) ?? ''

    const headers = new HttpHeaders()
      .set('x-token', token)

    // GeneralFormat
    return this.http.post<any>(this.url, body, { headers }) // { observe: 'response' }
      .pipe(
        tap(resp => {
          this.activities.push(resp.message)
          this.activities$.next(this.activities)
        }),
        map(resp => resp),
        catchError(error => {
          return of(error)
        })
      )
  }

  updateActivity (newActivity: Activity): Observable<GeneralFormat> {
    const body = newActivity
    const token = localStorage.getItem(this.tokenItem) ?? ''
    const headers = new HttpHeaders()
      .set('x-token', token)

    // GeneralFormat
    return this.http.patch<any>(this.url, body, { headers }) // { observe: 'response' }
      .pipe(
        map(resp => resp),
        catchError(error => {
          return of(error)
        })
      )

    /* const routine = this.routine
    const activityIndex = routine.findIndex(activity => activity.id === newActivity.id)
    if (activityIndex !== -1) {
      routine[activityIndex] = newActivity
      this.saveRoutine(routine)
      return newActivity
    } */
  }

  removeActivity (id: string): Observable<any> {
    /*  const routine = this.routine.filter(activity => activity.id !== id)
    this.saveRoutine(routine) */
    const token = localStorage.getItem(this.tokenItem) ?? ''
    const headers = new HttpHeaders()
      .set('x-token', token)

    // GeneralFormat
    return this.http.delete<any>(`${this.url}/${id}`, { headers })
      .pipe(
        map(resp => resp),
        catchError(error => {
          return of(error)
        })
      )
  }

  private orderByStartTime (routine: Activity[]): Activity[] {
    routine.sort((a, b) => {
      const aStartTime = a.startTime?.split(':')
      const aStartHour = Number(aStartTime[0])
      const aStartMin = Number(aStartTime[1])
      const bStartTime = b.startTime?.split(':')
      const bStartHour = Number(bStartTime[0])
      const bStartMin = Number(bStartTime[1])

      if (aStartHour > bStartHour) return 1
      if (aStartHour < bStartHour) return -1

      if (aStartMin > bStartMin) return 1
      if (aStartMin < bStartMin) return -1

      return 0 // a must be equal to b
    })

    return routine
  }
}
