import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { BehaviorSubject } from 'rxjs'

import { Activity } from 'src/app/shared/models/Activity'
import { Actions } from 'src/app/shared/Actions'

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent {
  btnEditColor = '#74b9ff'
  btnDeleteColor = '#ff7675'
  btnSaveColor = '#00b894'
  btnCancelColor = '#fdcb6e'
  btnCloseColor = '#ffeaa7'
  // eslint-disable-next-line accessor-pairs
  @Input() set activity (activity: Activity | undefined) {
    if (activity !== undefined) {
      this._activity = activity
      this.evalData(activity)
    }
  }

  @Output() deleteEvent = new EventEmitter<string>()
  @Output() updateEvent = new EventEmitter<Activity>()
  @Output() addEvent = new EventEmitter<Activity>()
  @Output() closeEvent = new EventEmitter<boolean>()
  private readonly actionControl = new BehaviorSubject(Actions.VIEW)
  private currentAction = Actions.VIEW
  private _activity?: Activity

  // TODO: Validaciones
  activityForm = this.fb.group({
    id: [''],
    icon: ['', Validators.required],
    title: [''],
    startTime: ['12:00'],
    durationTime: ['00:05']
  })

  constructor (private readonly fb: FormBuilder) { }

  ngOnInit (): void {
    this.actionControl.subscribe(action => {
      this.currentAction = action
    })
  }

  private evalData (activity: Activity): void {
    this.setData(activity)
    if (activity.id === '') {
      this.actionControl.next(Actions.NEW)
    }
  }

  setData (activity: Activity): void {
    this.activityForm.patchValue({
      id: activity.id,
      icon: activity.icon,
      title: activity.title,
      startTime: activity.startTime,
      durationTime: activity.durationTime
    })
  }

  save (): void {
    // TODO: validar que en realida algo cambio
    const { id, icon, title, startTime, durationTime } = this.activityForm.value
    const activity = new Activity(id, icon, title, startTime, durationTime)

    if (this.currentAction === Actions.EDIT) {
      this.updateEvent.emit(activity)
    }
    if (this.currentAction === Actions.NEW) {
      this.addEvent.emit(activity)
    }

    this.actionControl.next(Actions.VIEW)
  }

  cancel (): void {
    if (this.currentAction === Actions.EDIT && this._activity !== undefined) {
      this.setData(this._activity)
      this.actionControl.next(Actions.VIEW)
    }
    if (this.currentAction === Actions.NEW) {
      this.closeView()
    }
  }

  edit (): void {
    this.actionControl.next(Actions.EDIT)
  }

  delete (): void {
    // TODO: Alerta de confirmación para eliminar
    // TODO: No ejecutar si no se ha confirmado la eliminacion
    this.deleteEvent.emit(this._activity?.id)
    this.closeView()
  }

  closeView (): void {
    this.closeEvent.emit(true)
  }

  ngOnDestroy (): void {
    this.actionControl.unsubscribe()
  }

  /**
   * Validaciones
   */
  get isActionView (): boolean {
    return (this.currentAction === 'view')
  }
}
