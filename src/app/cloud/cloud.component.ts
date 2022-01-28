import { Component, OnInit } from '@angular/core'
import { CloudService } from './cloud.service'

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.css']
})
export class CloudComponent implements OnInit {
  constructor (private readonly service: CloudService) { }

  ngOnInit (): void {
    /*  this.service.getProducts()
    .pipe (
      tap ( res => console.log(res))
    )
    .subscribe() */
  }
}
