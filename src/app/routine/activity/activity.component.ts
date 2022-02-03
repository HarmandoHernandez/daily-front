import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { BehaviorSubject } from 'rxjs'

import { Activity } from 'src/app/shared/models/Activity'
import { Actions } from 'src/app/shared/Actions'

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  @Input() activity?: Activity
  // TODO Enable btns segun el estado de la activity
  // TODO Editar, Eliminar Y Agregar Actividad

  constructor (private readonly fb: FormBuilder) { }

  activityForm = this.fb.group({
    id: [''],
    icon: ['', Validators.required],
    title: [''],
    startHour: ['12:00'],
    durationMins: ['00:05']
  })

  ngOnInit (): void {
    console.log(this.activity)
    if (this.activity != null) {
      this.setData(this.activity)
    }
    const currentAction = new BehaviorSubject(Actions.VIEW)

    currentAction.subscribe(console.log)
  }

  setData (activity: Activity): any {
    this.activityForm.patchValue({
      id: activity.id,
      icon: activity.icon,
      title: activity.title,
      startHour: activity.startTime,
      durationMins: activity.durationTime
    })
  }

  updateName (): any {
    this.activityForm.patchValue({
      title: 'Lucy'
    })
  }

  onSubmit (): any {
    // TODO: Use EventEmitter with form value
    console.warn(this.activityForm.value)
  }
}
