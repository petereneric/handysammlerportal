import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationPage } from './verification.page';
import {AgreementPage} from '../../agreement/agreement.page';
import {CookieGuardService} from '../../../services/cookie-guard/cookie-guard.service';

const routes: Routes = [
  {
    path: '',
    component: VerificationPage,
    canActivate: [CookieGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationPageRoutingModule {}
