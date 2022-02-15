import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-auth',
  template: `
    <div class="auth">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .auth {
      width: max-content;
      max-width: var(--max-with-routine-view);
      margin: 0 auto;
      text-align: center;

    }`]
})
export class AuthComponent implements OnInit {
  // constructor () { }

  ngOnInit (): void {
  }
}
