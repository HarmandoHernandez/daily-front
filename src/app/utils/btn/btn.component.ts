import { Component, EventEmitter, Input, Output, AfterViewInit } from '@angular/core'

@Component({
  selector: 'util-btn',
  template: `
    <button type="button" class="btn" (click)="click()" >
      <div #background class="background" color [color]="color"></div>
      <span>{{ title }}</span>
    </button>
`,
  styleUrls: ['./btn.component.css']
})
export class BtnComponent implements AfterViewInit {
  @Input() title: string = ''
  @Input() color: string = '#ccae62'
  @Output() clickEvent = new EventEmitter<boolean>()

  ngAfterViewInit (): void {
  }

  click (): void {
    this.clickEvent.emit(true)
  }
}
