import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {AuthGuardService} from './services/auth-guard.service';
import {RoleGuardService} from './services/role-guard.service';
import {DataCollectorPage} from './pages/portal/collector/data-collector/data-collector.page';

const routes: Routes = [{path: '', component: AppComponent, canActivate: [AuthGuardService, RoleGuardService]},
    {path: 'app-root', component: AppComponent, canActivate: [AuthGuardService, RoleGuardService]},
    {
        path: 'collector',
        loadChildren: () => import('./pages/portal/collector/collector.module').then(m => m.CollectorPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
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
