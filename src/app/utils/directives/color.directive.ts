import { Directive, ElementRef, Input } from '@angular/core'

@Directive({
  selector: '[color]'
})
export class DefineColorDirective {
  private _color: string = 'black'

  htmlElement: ElementRef<HTMLElement>

  // eslint-disable-next-line accessor-pairs
  @Input() set color (valor: string) {
    this._color = valor
    this.setColor()
  }
  /* get color (): string {
    return this._color
  } */

  constructor (private readonly el: ElementRef<HTMLElement>) {
    this.htmlElement = el
  }

  setColor (): void {
    this.htmlElement.nativeElement.style.background = this._color
  }
}
