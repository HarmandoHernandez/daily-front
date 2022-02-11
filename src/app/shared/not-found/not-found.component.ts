import { Component } from '@angular/core'

@Component({
  selector: 'app-not-found',
  template: `
    <article class="not-found">
      <p class="not-found__title">404</p>
      <pre>Not Found.</pre>
      Address not found :(
      <p class="not-found_desciption"></p>
    </article>
`,
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
}
