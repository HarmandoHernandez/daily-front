import { Component } from '@angular/core'
import { CloudService } from './cloud.service'

@Component({
  selector: 'app-cloud',
  template: `
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `
})
export class CloudComponent {
  constructor (private readonly service: CloudService) { }
}
