import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectorPage } from './collector.page';
import {AuthGuardService} from "../../../services/auth-guard.service";
import {DataCollectorPage} from "./data-collector/data-collector.page";

const routes: Routes = [
  {
    path: 'collector',
    component: CollectorPage,
    children: [
      {path: 'data-collector', component: DataCollectorPage},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectorPageRoutingModule {}
