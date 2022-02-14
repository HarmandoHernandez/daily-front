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
      width: 100%;
      max-width: var(--max-with-routine-view);
      margin: 0 auto;
      text-align: center;
      align-items: center;
    }`]
})
export class AuthComponent implements OnInit {
  // constructor () { }

  ngOnInit (): void {
  }
}
