import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import {AuthGuardService} from "../../services/auth-guard/auth-guard.service";
import {RoleGuardService} from "../../services/role-guard/role-guard.service";
import {AgreementPage} from '../agreement/agreement.page';
import {CookieGuardService} from '../../services/cookie-guard/cookie-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    canActivate: [CookieGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
