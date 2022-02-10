import { Directive, ElementRef, Input, OnInit } from '@angular/core'

@Directive({
  selector: '[message]'
})
export class MessageDirective implements OnInit {
  private _color: string = 'red'
  private _mensaje: string = 'message'

  htmlElement: ElementRef<HTMLElement>

  // eslint-disable-next-line accessor-pairs
  @Input() set color (valor: string) {
    this._color = valor
    this.setColor()
  }

  // eslint-disable-next-line accessor-pairs
  @Input() set mensaje (valor: string) {
    this._mensaje = valor
    this.setMensaje()
  }

  // eslint-disable-next-line accessor-pairs
  @Input() set valido (valor: boolean) {
    if (valor) {
      this.htmlElement.nativeElement.classList.add('hidden')
    } else {
      this.htmlElement.nativeElement.classList.remove('hidden')
    }
  }

  constructor (private readonly el: ElementRef<HTMLElement>) {
    this.htmlElement = el
  }

  ngOnInit (): void {
    this.setColor()
    this.setMensaje()
  }

  setColor (): void {
    this.htmlElement.nativeElement.style.color = this._color
  }

  setMensaje (): void {
    this.htmlElement.nativeElement.innerText = this._mensaje
  }
}
