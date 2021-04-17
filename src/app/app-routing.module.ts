import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path:"",
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)
  },
 
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate:[AuthGuard]
  },
  {
    path:"**",
    component:NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
