import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImpressumPage } from './impressum.page';
import {AgreementPage} from '../../../agreement/agreement.page';
import {CookieGuardService} from '../../../../services/cookie-guard/cookie-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ImpressumPage,
    canActivate: [CookieGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImpressumPageRoutingModule {}
