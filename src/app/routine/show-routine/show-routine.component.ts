import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-routine',
  templateUrl: './show-routine.component.html',
  styleUrls: ['./show-routine.component.css']
})
export class ShowRoutineComponent implements OnInit {

  readonly initialRoutine = [
    { id: '1', icon: '📚', title: 'Lee/Escribe/dibuja', start: '5:10', duration: '30'}, // min
    { id: '2', icon: '🧘', title: 'Meditación', start: '5:50', duration: '30'},
    { id: '3', icon: '🏋️', title: 'Ejercicio', start: '6:30', duration: '60'},
    { id: '4', icon: '🍳', title: 'Alimentación', start: '7:40', duration: '30'},
    { id: '5', icon: '⚙️', title: 'Proyectos', start: '9:00', duration: '180'},
    { id: '6', icon: '🥗', title: 'Alimentación', start: '14:00', duration: '60'},
    { id: '7', icon: '⚙️', title: 'Proyectos', start: '15:10', duration: '180'},
    { id: '8', icon: '🍲', title: 'Alimentación', start: '18:30', duration: '40'},
    { id: '9', icon: '🏃', title: 'Saltos cuerda 50*3', start: '19:20', duration: '10'},
    { id: '10', icon: '🧖', title: 'Baño', start: '19:40', duration: '40'},
    { id: '11', icon: '🧘', title: 'Meditación', start: '20:30', duration: '20'},
    { id: '12', icon: '💤', title: 'Dormir', start: '21:00', duration: '480'}
  ]

  constructor() { }

  ngOnInit(): void {
    /* this.currentTime()
    setInterval(this.currentTime.bind(this), 1000) */
  }

  calculateHoursAndMinutes = (min = 0) => {
    let hours = 0
    while (min > 59)
    {
      min = min - 60
      hours++
    }
    return { hours , min }
  }


  currentTime() {
    const date = new Date()

    let month = date.getMonth()
    let day = date.getDate()
    let year = date.getFullYear()

    // Filtra las posibles opciones dentro del rango de tiempo
    const currentActivity = this.initialRoutine.filter((activity) => {
      const activityStart = activity.start.split(':')

      let durationTime = this.calculateHoursAndMinutes(Number(activity.duration) + Number(activityStart[1]))

      const timeActivityStart = new Date(year, month, day, Number(activityStart[0]), Number(activityStart[1]), 0, 0)
      const timeActivityEnd = new Date(year, month, day, durationTime.hours + Number(activityStart[0]), durationTime.min,0,0)

      const start = date.getTime() > timeActivityStart.getTime()
      const end = date.getTime() < timeActivityEnd.getTime()

      return end && start
    })

    console.log(currentActivity[0].icon)
    
    // TODO : quitar el estilo
    /* if (currentActivity[0]) {
    const current = $(currentActivity[0].id)
    current.style.padding = '3em'
    current.style.display = 'block'
    current.style.backgroundColor = 'yellow'
    current.style.fontSize = '2em'
    current.style.color = '#000'
    } */
  }
}
