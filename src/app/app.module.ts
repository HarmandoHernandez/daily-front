import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { HeaderComponent } from './shared/header/header.component'
import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './shared/not-found/not-found.component'
/*
import { RoutineListComponent } from './shared/routiness/routine-list/routine-list.component' // './../routine/show-routine/show-routine.component'
import { RoutineActivityComponent } from './shared/routiness/routine-activity/routine-activity.component' */
import { ActivityComponent } from './shared/activity/activity.component'
import { RoutineComponent } from './shared/routine/routine.component';
import { RoutineModule } from './routine/routine.module'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    ActivityComponent,
    RoutineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RoutineModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
