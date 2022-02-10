import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ModalActions, ModalData } from 'src/app/shared/models/Modal.model'

@Component({
  selector: 'util-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  private readonly initialData = new ModalData(
    'Title',
    'This is the description description description description description description description description',
    [new ModalActions('id', 'Title button', '#e17055')])

  @Input() data: ModalData = this.initialData
  @Output() clickEvent = new EventEmitter<string>()

  ngOnInit (): void {
  }

  click (actionId: any): void {
    this.clickEvent.emit(actionId)
  }
}
