import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'hour',
  pure: true
})
export class HourPipe implements PipeTransform {
  private readonly timeRxjs = /^([0-1][0-9])(:)([0-5][0-9])$/
  transform (time: string): string {
    if (!this.timeRxjs.test(time)) return 'NaN'
    const timeArr = time.split(':')
    const startHour = Number(timeArr[0])
    const format = (startHour < 12) ? 'a. m.' : 'p. m.'
    return `${time} ${format}`
  }
}
