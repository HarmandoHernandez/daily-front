import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloudRoutingModule } from './cloud-routing.module';
import { CloudComponent } from './cloud.component';


@NgModule({
  declarations: [
    CloudComponent
  ],
  imports: [
    CommonModule,
    CloudRoutingModule
  ]
})
export class CloudModule { }
