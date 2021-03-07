import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { LoginComponent } from './login/login.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'internal-error', component: ServerErrorComponent },
  { path: '',   redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
