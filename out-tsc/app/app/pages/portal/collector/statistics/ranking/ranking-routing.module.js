import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RankingPage } from './ranking.page';
const routes = [
    {
        path: '',
        component: RankingPage
    }
];
let RankingPageRoutingModule = class RankingPageRoutingModule {
};
RankingPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], RankingPageRoutingModule);
export { RankingPageRoutingModule };
//# sourceMappingURL=ranking-routing.module.js.map