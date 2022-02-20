import { Injectable } from '@angular/core'
import { Activity } from 'src/app/shared/models/Activity.model'

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  private readonly ROUTINE_NAME = 'routine'

  get routine (): Activity[] {
    const routine = JSON.parse(localStorage.getItem(this.ROUTINE_NAME) ?? '[]')
    return this.orderByStartTime(routine)
  }

  findActivity (id: string): Activity | undefined {
    return this.routine.find(activity => activity.id === id)
  }

  addActivity (newActivity: Activity): Activity {
    newActivity.id = this.newId
    const routine = this.routine
    routine.push(newActivity)
    this.saveRoutine(routine)
    return newActivity
  }

  updateActivity (newActivity: Activity): Activity {
    const routine = this.routine
    const activityIndex = routine.findIndex(activity => activity.id === newActivity.id)
    if (activityIndex !== -1) {
      routine[activityIndex] = newActivity
      this.saveRoutine(routine)
      return newActivity
    }
    return new Activity('', '', '', '', 0)
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
    if (allIds.length === 0) {
      return '1'
    }
    const id = Math.max(...allIds) + 1
    return id.toString()
  }

  private orderByStartTime (routine: Activity[]): Activity[] {
    routine.sort((a, b) => {
      const aStartTime = a.startTime?.split(':')
      const aStartHour = Number(aStartTime[0])
      const aStartMin = Number(aStartTime[1])
      const bStartTime = b.startTime?.split(':')
      const bStartHour = Number(bStartTime[0])
      const bStartMin = Number(bStartTime[1])

      if (aStartHour > bStartHour) return 1
      if (aStartHour < bStartHour) return -1

      if (aStartMin > bStartMin) return 1
      if (aStartMin < bStartMin) return -1

      return 0 // a must be equal to b
    })

    return routine
  }
}
