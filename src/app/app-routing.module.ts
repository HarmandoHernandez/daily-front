import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './shared/not-found/not-found.component'
import { EvalTokenGuard } from 'src/app/shared/guards/eval-token.guard'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'local',
    loadChildren: async () => await import('./local/local.module').then(m => m.LocalModule)
  },
  {
    path: 'cloud',
    loadChildren: async () => await import('./cloud/cloud.module').then(m => m.CloudModule),
    canActivate: [EvalTokenGuard],
    canLoad: [EvalTokenGuard]
  },
  { path: 'auth', loadChildren: async () => await import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
