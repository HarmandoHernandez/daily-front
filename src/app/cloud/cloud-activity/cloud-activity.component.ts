import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { Activity } from 'src/app/shared/models/Activity.model'
import { Actions } from 'src/app/shared/enums/Actions.enum'
import { switchMap } from 'rxjs'
import { CloudService } from '../cloud.service'

@Component({
  selector: 'cloud-activity',
  templateUrl: './cloud-activity.component.html',
  styles: []
})
export class CloudActivityComponent implements OnInit {
  initialActivity = new Activity('', '', '', '00:00', 5)
  hadActivity: boolean = false
  activityId: string = ''
  activity?: Activity

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
  }

  updateActivity (activity: Activity): void {
    this.cloudService.updateActivity(activity)
  }

  addActivity (activity: Activity): void {
    const saved = this.cloudService.addActivity(activity)
    void this.router.navigate([`cloud/activity/${saved.id}`])
  }

  closeActivity (): void {
    void this.router.navigate(['cloud'])
  }
}
