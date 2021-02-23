import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import jwt_decode from 'jwt-decode';
let RankingPage = class RankingPage {
    constructor(connApi) {
        this.connApi = connApi;
        // Urls
        this.urlRanking = 'collector/statistics/ranking';
        this.urlCountries = 'region/countries';
        this.urlStates = 'region/states/';
        this.urlCities = 'collector/region/cities';
        this.urlTypes = 'types';
        this.urlType = 'collector/type';
        this.urlState = 'collector/region/state';
        this.urlCity = 'collector/region/city';
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
        this.oCollectorState = null;
        this.lCities = [];
        this.oCollectorCity = null;
        this.oSelectRegion = null;
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
        // city
        this.connApi.safeGet(this.urlCities).subscribe((response) => {
            console.log(response.body);
            this.lCities = response.body;
        });
        this.connApi.safeGet(this.urlCity).subscribe((response) => {
            this.oCollectorCity = response.body;
        });
        // states
        this.connApi.safeGet(this.urlStates + 1).subscribe((response) => {
            this.lStates = response.body;
        });
        this.connApi.safeGet(this.urlState).subscribe((response) => {
            this.oCollectorState = response.body;
        });
        // country
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
            kSelectRegion: this.oSelectRegion != null ? this.oSelectRegion.id : null,
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
        this.oSelectRegion = null;
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
                this.oSelectRegion = this.oCollectorState;
                /*
                setTimeout(() => {
                    this.selectRegion.open();
                }, this.timeSelect);
                 */
                this.load();
                break;
            case this.lRegion[3]:
                this.lSelectRegion = this.lCities;
                this.oSelectRegion = this.oCollectorCity;
                /*
                setTimeout(() => {
                    this.selectRegion.open();
                }, this.timeSelect);
                 */
                this.load();
                break;
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