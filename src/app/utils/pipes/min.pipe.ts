import { Pipe, PipeTransform } from '@angular/core'
import { UtilsService } from 'src/app/shared/services/utils.service'

@Pipe({
  name: 'min'
})
export class MinPipe implements PipeTransform {
  constructor (
    private readonly utilsService: UtilsService
  ) { }

  transform (duration: number): string {
    const time = this.utilsService.calcTime(duration)
    return `${time.hours} h, ${time.min} min`
  }
}
