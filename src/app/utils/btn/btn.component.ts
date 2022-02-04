import { Component, EventEmitter, Input, Output, AfterViewInit } from '@angular/core'

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.css']
})
export class BtnComponent implements AfterViewInit {
  @Input() title: string = ''
  @Input() color: string = '#'
  @Output() clickEvent = new EventEmitter<boolean>()

  ngAfterViewInit (): void {
    //
  }

  click (): void {
    this.clickEvent.emit(true)
  }
}
