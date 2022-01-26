import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core'
import { fromEvent } from 'rxjs'
import { HasEventTargetAddRemove } from 'rxjs/internal/observable/fromEvent'

@Component({
  selector: 'app-show-routine',
  templateUrl: './show-routine.component.html',
  styleUrls: ['./show-routine.component.css']
})
export class ShowRoutineComponent implements OnInit, AfterViewInit {
  routine: Activity [] = []
  // @ViewChild('routine') routineList?: ElementRef

  /* constructor () {} */

  ngOnInit (): void {
    this.routine = this.getRoutine()
    this.currentTime(this.routine)

    setInterval(this.currentTime.bind(this, this.routine), 1000)
  }

  ngAfterViewInit (): void {
    const routineList = document.getElementById('routine')

    const clickEventRoutineList = fromEvent(routineList as HasEventTargetAddRemove<ElementRef>, 'click')

    clickEventRoutineList.subscribe((e: any) => {
      if (e.target.nodeName !== 'UL') {
        console.log(e.target.id)
      }
    })
  }

  showActivity (e: any): void {
    console.log(e)
  }

  getRoutine (): Activity[] {
    const routine = [
      new Activity('1', '📚', 'Lee/Escribe/dibuja', '5:10', 30),
      new Activity('2', '🧘', 'Meditación', '5:50', 30),
      new Activity('3', '🏋️', 'Ejercicio', '6:30', 60),
      new Activity('4', '🍳', 'Alimentación', '7:40', 30),
      new Activity('5', '⚙️', 'Proyectos', '9:00', 190),
      new Activity('6', '🥗', 'Alimentación', '14:00', 60),
      new Activity('7', '⚙️', 'Proyectos', '15:10', 180),
      new Activity('8', '🍲', 'Alimentación', '18:30', 40),
      new Activity('9', '🏃', 'Saltos cuerda 50*3', '19:20', 10),
      new Activity('10', '🧖', 'Baño', '19:40', 40),
      new Activity('11', '🧘', 'Meditación', '20:30', 20),
      new Activity('12', '💤', 'Dormir', '21:00', 480)
    ]
    return routine
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

    /* console.log(currentActivity[0].icon) */
    const current = document.getElementById(currentActivity[0].id)

    if (current != null) {
      current.classList.add('activity--active')
      /* current.style.backgroundColor = '#ccc'
      current.style.fontSize = '2em'
      current.style.color = '#fff' */
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

class Activity {
  constructor (
    public id: string,
    public icon: string,
    public title: string,
    public startHour: string,
    public durationMins: number
  ) { }
}
