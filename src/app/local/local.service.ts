import { Injectable } from '@angular/core'

import { Activity } from 'src/app/shared/models/Activity'

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  // constructor () { }

  getRoutine (): Activity[] {
    return this.routine
  }

  getActivity (id: string): Activity {
    const index = this.routine.findIndex(activity => activity.id === id)
    return this.routine[index]
  }

  addActivity (activity: Activity): Activity {
    // const { icon, title, startHour, durationMins } = activity
    const id = this.getId()
    // const newActivity = new Activity(id, icon, title, startHour, durationMins)
    activity.id = id
    this.routine.push(activity)
    return activity
  }

  deleteActivity (id: string): boolean {
    this.routine = this.routine.filter(activity => activity.id !== id)
    return true
  }

  getId (): string {
    const ids = this.routine.map(activity => Number(activity.id))
    const id = Math.max(...ids) + 1
    return id.toString()
  }

  routine = [
    new Activity('1', '📚', 'Lee/Escribe/dibuja', '05:10', '00:30'),
    new Activity('2', '🧘', 'Meditación', '05:50', '00:30'),
    new Activity('3', '🏋️', 'Ejercicio', '06:30', '00:60'),
    new Activity('4', '🍳', 'Alimentación', '07:40', '00:30'),
    new Activity('5', '⚙️', 'Proyectos', '09:00', '03:00'),
    new Activity('6', '🥗', 'Alimentación', '14:00', '01:00'),
    new Activity('7', '⚙️', 'Proyectos', '15:10', '03:03'),
    new Activity('8', '🍲', 'Alimentación', '18:30', '00:40'),
    new Activity('9', '🏃', 'Saltos cuerda 50*3', '19:20', '00:10'),
    new Activity('10', '🧖', 'Baño', '19:40', '00:40'),
    new Activity('11', '🧘', 'Meditación', '20:30', '00:20'),
    new Activity('12', '💤', 'Dormir', '21:00', '08:00')
  ]
}
