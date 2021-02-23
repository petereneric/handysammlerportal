import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetPage } from './reset.page';
import {AgreementPage} from '../../agreement/agreement.page';
import {CookieGuardService} from '../../../services/cookie-guard/cookie-guard.service';

const routes: Routes = [
  {
    path: 'token/:token',
    component: ResetPage,
    canActivate: [CookieGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPageRoutingModule {}
