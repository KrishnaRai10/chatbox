import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { noAuthGuard } from './noAuth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: SignupComponent,
    canActivate: [noAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [noAuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
