import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './shared/not-found/not-found.component'

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'local', loadChildren: () => import('./local/local.module').then(m => m.LocalModule) },
  { path: 'cloud', loadChildren: () => import('./cloud/cloud.module').then(m => m.CloudModule) },
  /* { path: 'routine', loadChildren: () => import('./routine/routine.module').then(m => m.RoutineModule) }, */
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
