import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { LocalService } from './../local.service'
import { Activity } from 'src/app/shared/models/Activity'

@Component({
  selector: 'app-local-activity',
  templateUrl: './local-activity.component.html',
  styleUrls: ['./local-activity.component.css']
})
export class LocalActivityComponent implements OnInit {
  activity?: Activity

  constructor (
    private readonly route: ActivatedRoute,
    private readonly localService: LocalService
  ) { }

  ngOnInit (): void {
    const activityId = this.route.snapshot.paramMap.get('id') ?? ''
    console.log(activityId)
    this.activity = this.localService.getActivity(activityId)
    console.log(this.activity)
  }
}
