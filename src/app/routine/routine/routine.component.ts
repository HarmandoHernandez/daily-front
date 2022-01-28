import { Component, ElementRef, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { HasEventTargetAddRemove } from 'rxjs/internal/observable/fromEvent'
import { fromEvent } from 'rxjs'

import { Activity } from './../../shared/models/Activity'

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})
export class RoutineComponent implements OnInit {
  @Input() routine: Activity [] = []

  @Output() activityId = new EventEmitter<string>()

  ngOnInit (): void {
    this.currentTime(this.routine)

    setInterval(this.currentTime.bind(this, this.routine), 1000)
  }

  ngAfterViewInit (): void {
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
    // TODO : quitar el estilo
  }

  identifyActivity (activity: Activity, dateObj: any): boolean {
    const { date, month, day, year } = dateObj

    const activityStartHour = activity.startHour?.split(':')
    const hour = Number(activityStartHour[0])
    const min = Number(activityStartHour[1])

    const duration = this.calcTime(activity.durationMins + min)

    const timeActivityStart = new Date(year, month, day, hour, min, 0, 0)
    const timeActivityEnd = new Date(year, month, day, duration.hours + hour, duration.min, 0, 0)

    const start = date.getTime() > timeActivityStart.getTime()
    const end = date.getTime() < timeActivityEnd.getTime()

    return end && start
  }

  calcTime (min: number): { hours: number, min: number} {
    let hours = 0
    while (min > 59) {
      min = min - 60
      hours++
    }
    return { hours, min }
  }
}
