import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  /**
   * Calculate hours and minutes of number minutes
   * @param min Total number of minutes
   * @returns Equivalent in hours and mins
   */
  calcTime (min: number): { hours: number, min: number} {
    let hours = 0
    while (min > 59) {
      min = min - 60
      hours++
    }
    return { hours, min }
  }
}
