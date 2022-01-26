import { Component, OnInit } from '@angular/core';

import { MenuOption } from './../shared/models/MenuOption'

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})
export class RoutineComponent implements OnInit {
  readonly MENU_OPTIONS = [
    new MenuOption('all', 'All'),
    new MenuOption('add', 'Add'),
    new MenuOption('update', 'Update'),
    new MenuOption('delete', 'Delete')
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
