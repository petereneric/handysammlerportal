import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RoleGuardService } from './services/role-guard/role-guard.service';
import { CookieGuardService } from './services/cookie-guard/cookie-guard.service';
const routes = [
    { path: 'app-root', component: AppComponent, canActivate: [CookieGuardService, RoleGuardService] },
    {
        path: 'collector',
        loadChildren: () => import('./pages/portal/collector/collector.module').then(m => m.CollectorPageModule),
    },
    {
        path: 'partner',
        loadChildren: () => import('./pages/portal/partner/partner.module').then(m => m.PartnerPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    { path: '', component: AppComponent, canActivate: [CookieGuardService, RoleGuardService] },
    {
        path: 'registration-collector',
        loadChildren: () => import('./pages/registration/collector/registration-form/registration-form.module').then(m => m.RegistrationFormPageModule)
    },
    {
        path: 'verification',
        loadChildren: () => import('./pages/registration/verification/verification.module').then(m => m.VerificationPageModule)
    },
    {
        path: 'impressum',
        loadChildren: () => import('./pages/portal/universal/impressum/impressum.module').then(m => m.ImpressumPageModule)
    },
    {
        path: 'confirmation',
        loadChildren: () => import('./pages/registration/confirmation/confirmation.module').then(m => m.ConfirmationPageModule)
    },
    {
        path: 'invalid',
        loadChildren: () => import('./pages/registration/invalid/invalid.module').then(m => m.InvalidPageModule)
    },
    {
        path: 'reset',
        loadChildren: () => import('./pages/password/reset/reset.module').then(m => m.ResetPageModule)
    },
    {
        path: 'request',
        loadChildren: () => import('./pages/password/request/request.module').then(m => m.RequestPageModule)
    },
    {
        path: 'agreement',
        loadChildren: () => import('./pages/agreement/agreement.module').then(m => m.AgreementPageModule)
    },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
        ],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map