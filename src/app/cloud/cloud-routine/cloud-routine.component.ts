import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { Activity } from 'src/app/shared/models/Activity.model'
import { Actions } from 'src/app/shared/enums/Actions.enum'
import { CloudService } from '../cloud.service'

@Component({
  selector: 'cloud-routine',
  templateUrl: './cloud-routine.component.html',
  styles: []
})
export class CloudRoutineComponent implements OnInit, OnDestroy {
  routine: Activity [] = []
  // Se conecta al service y le envia los datos a los componentes incrustados
  constructor (
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cloudService: CloudService
  ) { }

  ngOnInit (): void {
    this.cloudService.routine.subscribe(routine => {
      this.routine = routine
      console.log('routine', routine)
    })
    if (this.routine.length === 0) {
      this.cloudService.refersh()
    }
  }

  showActivity (activityId: string): void {
    void this.router.navigate([`activity/${activityId}`], { relativeTo: this.route })
  }

  clickEventAdd (): void {
    void this.router.navigate([`activity/${Actions.NEW}`], { relativeTo: this.route })
  }

  ngOnDestroy (): void {
    console.log('destroy')
  }
}
