import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationFormPage } from './registration-form.page';
import {AgreementPage} from '../../../agreement/agreement.page';
import {CookieGuardService} from '../../../../services/cookie-guard/cookie-guard.service';

const routes: Routes = [
    /*
  {
    path: 'test',
    component: RegistrationFormPage,

  },
  */
  {
    path: 'id/:id',
    component: RegistrationFormPage,
    canActivate: [CookieGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationFormPageRoutingModule {}
