import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { Activity } from './../../shared/models/Activity'

@Component({
  selector: 'app-local-routine',
  templateUrl: './local-routine.component.html',
  styleUrls: ['./local-routine.component.css']
})
export class LocalRoutineComponent implements OnInit {
  routine: Activity [] = []
  // route: ActivatedRoute | null | undefined
  // Se conecta al service y le envia los datos a los componentes hijos incrustados
  constructor (
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit (): void {
    this.routine = this.getRoutine()
  }

  showActivity (activityId: string): void {
    void this.router.navigate([`activity/${activityId}`], { relativeTo: this.route })
    // this.router.navigate(['items'], { relativeTo: this.route })
  }

  getRoutine (): Activity[] {
    const routine = [
      new Activity('1', '📚', 'Lee/Escribe/dibuja', '5:10', 30),
      new Activity('2', '🧘', 'Meditación', '5:50', 30),
      new Activity('3', '🏋️', 'Ejercicio', '6:30', 60),
      new Activity('4', '🍳', 'Alimentación', '7:40', 30),
      new Activity('5', '⚙️', 'Proyectos', '9:00', 190),
      new Activity('6', '🥗', 'Alimentación', '14:00', 60),
      new Activity('7', '⚙️', 'Proyectos', '15:10', 180),
      new Activity('8', '🍲', 'Alimentación', '18:30', 40),
      new Activity('9', '🏃', 'Saltos cuerda 50*3', '19:20', 10),
      new Activity('10', '🧖', 'Baño', '19:40', 40),
      new Activity('11', '🧘', 'Meditación', '20:30', 20),
      new Activity('12', '💤', 'Dormir', '21:00', 480)
    ]
    return routine
  }
}
