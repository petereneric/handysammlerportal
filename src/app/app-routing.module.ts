import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {AuthGuardService} from './services/auth-guard.service';
import {RoleGuardService} from './services/role-guard.service';
import {DataCollectorPage} from './pages/portal/collector/data-collector/data-collector.page';
import {CollectorPage} from './pages/portal/collector/collector.page';

const routes: Routes = [
    {path: 'app-root', component: AppComponent, canActivate: [AuthGuardService, RoleGuardService]},
    {
        path: 'collector',
        loadChildren: () => import('./pages/portal/collector/collector.module').then(m => m.CollectorPageModule),

    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {path: '', component: AppComponent, canActivate: [AuthGuardService, RoleGuardService]},
    {
        path: 'registration-collector',
        loadChildren: () => import('./pages/registration/collector/registration-form/registration-form.module').then(m => m.RegistrationFormPageModule)
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
