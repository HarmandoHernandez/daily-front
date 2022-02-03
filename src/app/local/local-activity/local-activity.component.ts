import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { LocalService } from './../local.service'
import { Activity } from 'src/app/shared/models/Activity'
import { Actions } from 'src/app/shared/Actions'

@Component({
  selector: 'app-local-activity',
  templateUrl: './local-activity.component.html',
  styleUrls: ['./local-activity.component.css']
})
export class LocalActivityComponent implements OnInit {
  hadActivity: boolean = false
  activity?: Activity

  constructor (
    private readonly route: ActivatedRoute,
    private readonly localService: LocalService
  ) { }

  ngOnInit (): void {
    // Obteniendo ID
    const activityId = this.route.snapshot.paramMap.get('id') ?? ''

    // Verifica si el id es para agregar nueva activity
    if (activityId === Actions.NEW) {
      this.setActivityData(new Activity('', '', '', '20:00', '00:05'))
    } else {
      // Busca alguna actividad con el id resivido
      const activity = this.localService.findActivity(activityId)
      if (activity !== undefined) this.setActivityData(activity)
    }
  }

  private setActivityData (activity: Activity): void {
    this.activity = activity
    this.hadActivity = true
  }

  deleteActivity (id: string): void {
    this.localService.removeActivity(id)
  }

  updateActivity (activity: Activity): void {
    this.localService.updateActivity(activity)
  }

  addActivity (activity: Activity): void {
    this.localService.addActivity(activity)
  }
}
