import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { BehaviorSubject } from 'rxjs'

import { Activity } from 'src/app/shared/models/Activity'
import { Actions } from 'src/app/shared/Actions'
import { ModalActions, ModalData } from 'src/app/shared/models/Modal.model'

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent {
  deleteModalData = new ModalData(
    'Delete Activity',
    'Are you sure of delete ** activity?',
    [
      new ModalActions(Actions.VIEW, 'No, cancel', '#b2bec3'),
      new ModalActions(Actions.DELETE, 'Yes, delete', '#e17055')
    ])

  // https://flatuicolors.com/palette/us
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
    icon: ['', [Validators.required, Validators.maxLength(2)]],
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    startTime: ['12:00', Validators.required],
    durationTime: ['00:05', Validators.required]
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

  get isValidFormData (): boolean {
    if (this.activityForm.invalid) {
      this.activityForm.markAllAsTouched()
      return false
    }
    return true
  }

  saveChanges (): void {
    if (!this.isValidFormData) return
    const { id, icon, title, startTime, durationTime } = this.activityForm.value
    const activity = new Activity(id, icon, title, startTime, durationTime)

    if (this.currentAction === Actions.EDIT) {
      this.updateEvent.emit(activity)
    }
    if (this.currentAction === Actions.NEW) {
      this.addEvent.emit(activity)
    }

    this.actionControl.next(Actions.VIEW)
    // TODO: Retroalimentacion de guardado
  }

  cancelOperation (): void {
    if (this.currentAction === Actions.EDIT && this._activity !== undefined) {
      this.setData(this._activity)
      this.actionControl.next(Actions.VIEW)
    }
    if (this.currentAction === Actions.NEW) {
      this.closeView()
    }
  }

  editActivity (): void {
    this.actionControl.next(Actions.EDIT)
  }

  deleteActivity (): void {
    this.deleteEvent.emit(this._activity?.id)
    this.closeView()
  }

  toggleModal (): void {
    this.deleteModalData.body = this.deleteModalData.body.replace('**', `'${this._activity?.title ?? ''}'`)
    this.actionControl.next(Actions.DELETE)
  }

  clickModal (action: string): void {
    if (action === Actions.DELETE) {
      this.deleteActivity()
      this.closeView()
    }
    if (action === Actions.VIEW) {
      this.actionControl.next(Actions.VIEW)
    }
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
    return (this.currentAction === Actions.VIEW)
  }

  get isActionDelete (): boolean {
    return (this.currentAction === Actions.DELETE)
  }

  isValid (campo: string): boolean {
    return (this.activityForm.controls[campo].errors != null) && this.activityForm.controls[campo].touched
  }
}
