import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { LocalService } from './../local.service'
import { Activity } from 'src/app/shared/models/Activity.model'
import { Actions } from 'src/app/shared/enums/Actions.enum'
import { switchMap } from 'rxjs'

@Component({
  selector: 'app-local-activity',
  templateUrl: './local-activity.component.html',
  styleUrls: ['./local-activity.component.css']
})
export class LocalActivityComponent implements OnInit {
  initialActivity = new Activity('', '', '', '00:00', 5)
  hadActivity: boolean = false
  activityId: string = ''
  activity?: Activity

  constructor (
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly localService: LocalService
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
    // Id puede ser igual a 'new'
    if (this.activityId === Actions.NEW) {
      this.setActivityData(this.initialActivity, true)
    } else {
      const activity = this.localService.findActivity(this.activityId) ?? this.initialActivity
      this.setActivityData(activity)
    }
  }

  private setActivityData (activity: Activity, newActivity: boolean = false): void {
    this.activity = activity
    this.hadActivity = Boolean(activity.id) || newActivity
  }

  deleteActivity (id: string): void {
    this.localService.removeActivity(id)
  }

  updateActivity (activity: Activity): void {
    this.localService.updateActivity(activity)
  }

  addActivity (activity: Activity): void {
    const saved = this.localService.addActivity(activity)
    void this.router.navigate([`local/activity/${saved.id}`])
  }

  closeActivity (): void {
    void this.router.navigate(['local'])
  }
}
