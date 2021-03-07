import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { AnonymousGuard } from './auth/anonymous.guard';
// Components
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UsersComponent } from './users/users.component';
import { AuditsComponent } from './audits/audits.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard] },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'audits',
        component: AuditsComponent,
        data: { role: 'Auditor' },
        canActivate: [RoleGuard],
      }
    ] },
  { path: 'internal-error', component: ServerErrorComponent },
  { path: '',   redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },
  // {
  //   path: 'audits',
  //   loadChildren: () => import('./audits/audits.module').then(mod => mod.AuditsModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
