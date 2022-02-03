import { Injectable } from '@angular/core'

import { Activity } from 'src/app/shared/models/Activity'

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private readonly ROUTINE_NAME = 'routine'

  get routine (): Activity[] {
    // TODO: Ordenar por horarios
    return JSON.parse(localStorage.getItem(this.ROUTINE_NAME) ?? '[]')
  }

  findActivity (id: string): Activity | undefined {
    return this.routine.find(activity => activity.id === id)
  }

  addActivity (activity: Activity): Activity {
    activity.id = this.newId
    const routine = this.routine
    routine.push(activity)
    this.saveRoutine(routine)
    return activity
  }

  updateActivity (newActivity: Activity): Activity {
    const routine = this.routine
    const activityIndex = routine.findIndex(activity => activity.id === newActivity.id)
    routine[activityIndex] = newActivity
    this.saveRoutine(routine)
    return newActivity
  }

  removeActivity (id: string): void {
    const routine = this.routine.filter(activity => activity.id !== id)
    this.saveRoutine(routine)
  }

  private saveRoutine (routine: Activity[]): void {
    localStorage.setItem(this.ROUTINE_NAME, JSON.stringify(routine))
  }

  private get newId (): string {
    const allIds = this.routine.map(activity => Number(activity.id))
    const id = Math.max(...allIds) + 1
    return id.toString()
  }

  /* routine = [
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
  ] */
}
