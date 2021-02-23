import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmationPage } from './confirmation.page';
import {AgreementPage} from '../../agreement/agreement.page';
import {CookieGuardService} from '../../../services/cookie-guard/cookie-guard.service';

const routes: Routes = [
  {
    path: 'token/:token',
    component: ConfirmationPage
  },
  {
    path: 'test',
    component: ConfirmationPage,
    canActivate: [CookieGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmationPageRoutingModule {}
