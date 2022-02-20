import { Component, ElementRef, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { HasEventTargetAddRemove } from 'rxjs/internal/observable/fromEvent'
import { fromEvent } from 'rxjs'

import { Activity } from 'src/app/shared/models/Activity.model'
import { UtilsService } from 'src/app/shared/services/utils.service'

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})
export class RoutineComponent implements OnInit {
  @Input() routine: Activity [] = []
  @Output() activityId = new EventEmitter<string>()

  constructor (
    private readonly utilsService: UtilsService
  ) { }

  ngOnInit (): void {
    this.currentTime(this.routine)

    // II TODO: Con RXJS
    setInterval(this.currentTime.bind(this, this.routine), 1000)
  }

  ngAfterViewInit (): void {
    // II TODO: Cambiar getElementById por ViewChill
    const routineList = document.getElementById('routine')
    const clickEventRoutineList = fromEvent(routineList as HasEventTargetAddRemove<ElementRef>, 'click')
    clickEventRoutineList.subscribe((event: any) => {
      if (event.target.nodeName !== 'UL') {
        this.activityId.emit(event.target.id)
      }
    })
  }

  currentTime (routine: Activity[] = []): any {
    const date = new Date()
    const dateObj = {
      date: date,
      month: date.getMonth(),
      day: date.getDate(),
      year: date.getFullYear()
    }

    // Filtra las posibles opciones dentro del rango de tiempo
    const currentActivity = routine.filter(activity => this.identifyActivity(activity, dateObj))

    if (currentActivity[0] === undefined) return

    const current = document.getElementById(currentActivity[0].id)

    if (current != null) {
      current.classList.add('activity--active')
    }
    // II TODO: quitar el estilo
  }

  identifyActivity (activity: Activity, dateObj: any): boolean {
    const { date, month, day, year } = dateObj
    const activityStartTime = activity.startTime?.split(':')
    const startHour = Number(activityStartTime[0])
    const startMin = Number(activityStartTime[1])

    // const activityDurationTime = activity.durationTime?.split(':')
    // const durationHours = Number(activityDurationTime[0])
    const durationMins = activity.durationTime// Number(activityDurationTime[1])

    const duration = this.utilsService.calcTime(durationMins + startMin)

    const timeActivityStart = new Date(year, month, day, startHour, startMin, 0, 0)
    const timeActivityEnd = new Date(year, month, day, duration.hours + startHour, duration.min, 0, 0)
    // const timeActivityEnd = new Date(year, month, day, (duration.hours + durationHours) + startHour, duration.min, 0, 0)

    const start = date.getTime() > timeActivityStart.getTime()
    const end = date.getTime() < timeActivityEnd.getTime()

    return end && start
  }
}
