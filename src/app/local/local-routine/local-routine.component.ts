import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { Activity } from 'src/app/shared/models/Activity.model'
import { Actions } from 'src/app/shared/enums/Actions.enum'
import { LocalService } from './../local.service'

@Component({
  selector: 'local-routine',
  templateUrl: './local-routine.component.html'
})
export class LocalRoutineComponent implements OnInit {
  routine: Activity [] = []
  // Se conecta al service y le envia los datos a los componentes incrustados
  constructor (
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly localService: LocalService
  ) { }

  ngOnInit (): void {
    this.routine = this.localService.routine
  }

  showActivity (activityId: string): void {
    void this.router.navigate([`activity/${activityId}`], { relativeTo: this.route })
  }

  clickEventAdd (): void {
    void this.router.navigate([`activity/${Actions.NEW}`], { relativeTo: this.route })
  }
}
