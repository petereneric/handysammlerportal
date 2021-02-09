import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationFormPage } from './registration-form.page';

const routes: Routes = [
    /*
  {
    path: 'test',
    component: RegistrationFormPage,

  },
  */
  {
    path: 'id/:id',
    component: RegistrationFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationFormPageRoutingModule {}
