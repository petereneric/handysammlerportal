import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import jwt_decode from 'jwt-decode';
let RankingPage = class RankingPage {
    constructor(connApi) {
        this.connApi = connApi;
        // Urls
        this.urlRanking = 'collector/statistics/ranking';
        this.urlCountries = 'collector/region/countries';
        this.urlStates = 'collector/region/states';
        this.urlCities = 'collector/region/cities';
        this.urlTypes = 'collector/types';
        this.urlType = 'collector/type';
        this.urlSettings = 'collector/settings';
        // Variables
        this.lTime = [{ key: 'total', name: 'Gesamt' }, { key: 'year', name: 'Jahr' }];
        this.cTime = this.lTime[0];
        this.lSelectTime = [{ key: 'current', name: 'Dieses Jahr' }, { key: 'last', name: 'Letztes Jahr' }];
        this.cSelectTime = this.lSelectTime[0];
        this.lRegion = [{ key: 'total', name: 'Gesamt' },
            { key: 'country', name: 'Land' },
            { key: 'state', name: 'Bundesland' },
            { key: 'city', name: 'Stadt' }];
        this.cRegion = this.lRegion[0];
        this.lSelectRegion = [];
        this.lCountries = [];
        this.lStates = [];
        this.lCities = [];
        this.cSelectRegion = null;
        this.lType = [{ key: 'total', name: 'Gesamt' }, { key: 'individual', name: 'Benutzerdefiniert' }];
        this.cType = this.lType[0];
        this.lSelectType = [];
        this.oSelectType = null;
        this.lData = null;
        this.bLoading = false;
        this.timeSelect = 50;
        this.bStatistics = null;
    }
    ngOnInit() {
        // id
        let token = localStorage.getItem('token');
        let tokenInfo = jwt_decode(token);
        this.kCollector = tokenInfo['id'];
        // load
        this.load();
        // regions
        this.connApi.safeGet(this.urlCities).subscribe((response) => {
            this.lCities = response.body;
        });
        this.connApi.safeGet(this.urlStates).subscribe((response) => {
            this.lStates = response.body;
        });
        this.connApi.safeGet(this.urlCountries).subscribe((response) => {
            this.lCountries = response.body;
        });
        // types
        this.connApi.safeGet(this.urlTypes).subscribe((response) => {
            this.lSelectType = response.body;
        });
        this.connApi.safeGet(this.urlType).subscribe((response) => {
            this.oSelectType = response.body;
        });
        // settings
        this.connApi.safeGet(this.urlSettings).subscribe((response) => {
            let data = response.body;
            this.bStatistics = data.bStatistics == 1;
        });
    }
    load() {
        // spinner
        this.bLoading = true;
        // reset
        this.lData = [];
        // prepare
        let data = {
            kTime: this.cTime.key,
            cSelectTime: this.cSelectTime.key,
            kRegion: this.cRegion.key,
            cSelectRegion: this.cSelectRegion,
            kType: this.cType.key,
            kSelectType: this.oSelectType != null ? this.oSelectType.id : null
        };
        console.log(data);
        // send
        this.connApi.safePost(this.urlRanking, data).subscribe((response) => {
            // data
            this.lData = response.body;
            // spinner
            this.bLoading = false;
        }, error => {
            // spinner
            this.bLoading = false;
            console.log(error);
        });
    }
    onLoad() {
        this.load();
    }
    onRegion($event) {
        if ($event['detail']['value'] !== this.cSelectRegion) {
            this.cSelectRegion = null;
            switch ($event['detail']['value']) {
                case this.lRegion[0]:
                    this.lSelectRegion = [];
                    this.load();
                    break;
                case this.lRegion[1]:
                    this.lSelectRegion = this.lCountries;
                    setTimeout(() => {
                        this.selectRegion.open();
                    }, this.timeSelect);
                    break;
                case this.lRegion[2]:
                    this.lSelectRegion = this.lStates;
                    setTimeout(() => {
                        this.selectRegion.open();
                    }, this.timeSelect);
                    break;
                case this.lRegion[3]:
                    this.lSelectRegion = this.lCities;
                    setTimeout(() => {
                        this.selectRegion.open();
                    }, this.timeSelect);
                    break;
            }
        }
    }
    onTime($event) {
        if ($event['detail']['value'] == this.lTime[0]) {
            this.load();
        }
        else {
            this.load();
        }
    }
    onType($event) {
        if ($event['detail']['value'] == this.lType[0]) {
            this.load();
        }
        else {
            if (this.oSelectType == null) {
                setTimeout(() => {
                    this.selectType.open();
                }, this.timeSelect);
            }
            else {
                this.load();
            }
        }
    }
    getYearFromDate($date) {
        let date = new Date($date);
        return date.getFullYear();
    }
    getNumber($number) {
        return $number.replace(',', '.');
    }
    isSelf($id) {
        return $id == this.kCollector;
    }
};
__decorate([
    ViewChild('selectTime')
], RankingPage.prototype, "selectTime", void 0);
__decorate([
    ViewChild('selectRegion')
], RankingPage.prototype, "selectRegion", void 0);
__decorate([
    ViewChild('selectType')
], RankingPage.prototype, "selectType", void 0);
RankingPage = __decorate([
    Component({
        selector: 'app-ranking',
        templateUrl: './ranking.page.html',
        styleUrls: ['./ranking.page.scss'],
    })
], RankingPage);
export { RankingPage };
//# sourceMappingURL=ranking.page.js.map