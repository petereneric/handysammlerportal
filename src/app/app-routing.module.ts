import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AppComponent} from './app.component';
import {AuthGuardService} from './services/auth-guard.service';
import {RoleGuardService} from './services/role-guard.service';
import {PortalCollectorComponent} from './components/portal/portal-collector/portal-collector.component';
import {DataCollectorComponent} from './components/portal/portal-collector/data-collector/data-collector.component';
import {PortalPartnerComponent} from './components/portal/portal-partner/portal-partner.component';

const routes: Routes = [{path: '', component: AppComponent, canActivate: [AuthGuardService, RoleGuardService]},
    {path: 'login-component', component: LoginComponent},
    {path: 'app-root', component: AppComponent, canActivate: [AuthGuardService, RoleGuardService]},
    {
        path: 'portal-collector-component', component: PortalCollectorComponent, canActivate: [AuthGuardService], children: [
            {path: 'data-collector', component: DataCollectorComponent},
        ],
    },
    {
        path: 'portal-partner-component', component: PortalPartnerComponent, canActivate: [AuthGuardService], children: [
            {path: 'order', component: DataCollectorComponent},
        ],
    },
    {path: 'data-collector', component: DataCollectorComponent},
    {path: '**', component: AppComponent},  {
    path: 'collector',
    loadChildren: () => import('./pages/portal/collector/collector.module').then( m => m.CollectorPageModule)
  },
    {path: 'test', component: DataCollectorComponent
    },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  }]
;

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
