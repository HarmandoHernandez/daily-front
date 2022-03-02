import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { Activity } from 'src/app/shared/models/Activity.model'
import { Actions } from 'src/app/shared/enums/Actions.enum'
import { switchMap } from 'rxjs'
import { CloudService } from '../cloud.service'
import { STATUS } from 'src/app/shared/enums/status.enum'

@Component({
  selector: 'cloud-activity',
  templateUrl: './cloud-activity.component.html',
  styles: []
})
export class CloudActivityComponent implements OnInit {
  initialActivity = new Activity('', 'A', 'A A A', '00:00', 5, '')
  hadActivity: boolean = false
  activityId: string = ''
  activity?: Activity
  errors: string[] = []

  constructor (
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cloudService: CloudService
  ) { }

  ngOnInit (): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.activityId = params.get('id') ?? ''
        this.evalActivity()
        return this.activityId
      })
    ).subscribe()
  }

  private evalActivity (): void {
    if (this.activityId === Actions.NEW) {
      this.setActivityData(this.initialActivity, true)
    } else {
      const activity = this.cloudService.findActivity(this.activityId) ?? this.initialActivity
      this.setActivityData(activity)
    }
  }

  private setActivityData (activity: Activity, newActivity: boolean = false): void {
    this.activity = activity
    this.hadActivity = Boolean(activity.id) || newActivity
  }

  deleteActivity (id: string): void {
    this.cloudService.removeActivity(id)
      .subscribe(resp => {
        this.errors = []
        if (resp.status === STATUS.SUCCESS) {
          console.log(resp)
          return
        }
        if (resp.status === STATUS.ERROR && Array.isArray(resp.message)) {
          resp.message.forEach((error: { param: any, error: any }) => {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            this.errors.push(`${error.param} is ${error.error}.`)
          })
        } else {
          this.errors.push('Something went wrong, please try again later.')
        }

        console.error(this.errors)
      })
  }

  updateActivity (activity: Activity): void {
    this.cloudService.updateActivity(activity)
      .subscribe(resp => {
        this.errors = []
        if (resp.status === STATUS.SUCCESS) {
          console.log(resp.message)
          return
        }
        if (resp.status === STATUS.ERROR && Array.isArray(resp.message)) {
          resp.message.forEach((error: { param: any, error: any }) => {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            this.errors.push(`${error.param} is ${error.error}.`)
          })
        } else {
          this.errors.push('Something went wrong, please try again later.')
        }

        console.error(this.errors)
      })
  }

  addActivity (activity: Activity): void {
    console.log(activity)
    // TODO: Agregar localmente tambien, para no volver consultar
    this.cloudService.addActivity(activity)
      .subscribe(resp => {
        this.errors = []
        if (resp.status === STATUS.SUCCESS) {
          console.log(resp)
          return
        }
        if (resp.status === STATUS.ERROR && Array.isArray(resp.message)) {
          resp.message.forEach(error => {
            this.errors.push(`${error.param} is ${error.error}.`)
          })
        } else {
          this.errors.push('Something went wrong, please try again later.')
        }

        console.error(this.errors)
      })
    // const saved = this.cloudService.addActivity(activity)
    // void this.router.navigate([`cloud/activity/${saved.id}`])
  }

  closeActivity (): void {
    void this.router.navigate(['cloud'])
  }
}
