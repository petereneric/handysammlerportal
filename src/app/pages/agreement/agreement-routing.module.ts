import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgreementPage } from './agreement.page';
import {AuthGuardService} from '../../services/auth-guard/auth-guard.service';
import {CookieGuardService} from '../../services/cookie-guard/cookie-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AgreementPage,
    canActivate: [CookieGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreementPageRoutingModule {}
