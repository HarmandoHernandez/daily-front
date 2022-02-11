import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <app-header class="app__header"></app-header>
      <main class="app__main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
    .app {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .app__header,
    .app__main {
      max-width: 1200px;
      width: 100%;
    }
    `
  ]
})
export class AppComponent {}
