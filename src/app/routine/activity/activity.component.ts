import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  constructor (private readonly fb: FormBuilder) { }

  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    })
  })

  ngOnInit (): void {
  }

  updateName (): any {
    console.log(this.profileForm)
    // this.profileForm.firstName.setValue('Nancy')
  }

  onSubmit (): any {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value)
  }
}
