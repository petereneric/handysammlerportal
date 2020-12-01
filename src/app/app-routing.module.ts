import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {AuthGuardService} from './services/auth-guard/auth-guard.service';
import {RoleGuardService} from './services/role-guard/role-guard.service';
import {DataCollectorPage} from './pages/portal/collector/data/data-collector.page';
import {CollectorPage} from './pages/portal/collector/collector.page';

const routes: Routes = [
    {path: 'app-root', component: AppComponent, canActivate: [RoleGuardService]},
    {
        path: 'collector',
        loadChildren: () => import('./pages/portal/collector/collector.module').then(m => m.CollectorPageModule),

    },
    {
        path: 'partner',
        loadChildren: () => import('./pages/portal/partner/partner.module').then( m => m.PartnerPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {path: '', component: AppComponent, canActivate: [RoleGuardService]},
    {
        path: 'registration-collector',
        loadChildren: () => import('./pages/registration/collector/registration-form/registration-form.module').then(m => m.RegistrationFormPageModule)
    },
    {
        path: 'verification',
        loadChildren: () => import('./pages/registration/verification/verification.module').then(m => m.VerificationPageModule)
    },
    {
        path: 'reset-password',
        loadChildren: () => import('./pages/login/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
    },]




;

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
