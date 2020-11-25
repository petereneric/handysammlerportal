import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import {AuthGuardService} from "../../services/auth-guard/auth-guard.service";
import {RoleGuardService} from "../../services/role-guard/role-guard.service";

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
