import {Component, OnInit, ViewChild} from '@angular/core';
import {ConnApiService} from '../../../../../services/conn-api/conn-api.service';
import {HttpResponse} from '@angular/common/http';
import {IonSelect} from '@ionic/angular';
import jwt_decode from 'jwt-decode';

@Component({
    selector: 'app-ranking',
    templateUrl: './ranking.page.html',
    styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

    @ViewChild('selectTime') selectTime: IonSelect;
    @ViewChild('selectRegion') selectRegion: IonSelect;
    @ViewChild('selectType') selectType: IonSelect;

    // Urls
    urlRanking = 'collector/statistics/ranking';
    urlCountries = 'region/countries';
    urlStates = 'region/states/';
    urlCities = 'collector/region/cities';
    urlTypes = 'types';
    urlType = 'collector/type';
    urlState = 'collector/region/state';
    urlCity = 'collector/region/city';
    urlSettings = 'collector/settings';

    // Variables
    lTime = [{key: 'total', name: 'Gesamt'}, {key: 'year', name: 'Jahr'}];
    cTime = this.lTime[0];
    lSelectTime = [{key: 'current', name: 'Dieses Jahr'}, {key: 'last', name: 'Letztes Jahr'}];
    cSelectTime = this.lSelectTime[0];

    lRegion = [{key: 'total', name: 'Gesamt'},
        {key: 'country', name: 'Land'},
        {key: 'state', name: 'Bundesland'},
        {key: 'city', name: 'Stadt'}];
    cRegion = this.lRegion[0];
    lSelectRegion = [];
    lCountries = [];
    lStates = [];
    oCollectorState = null;
    lCities = [];
    oCollectorCity = null;
    oSelectRegion = null;

    lType = [{key: 'total', name: 'Gesamt'}, {key: 'individual', name: 'Benutzerdefiniert'}];
    cType = this.lType[0];
    lSelectType = [];
    oSelectType = null;

    kCollector: number;
    lData = null;

    bLoading = false;
    timeSelect = 50;

    bStatistics: boolean = null;

    constructor(public connApi: ConnApiService) {
    }

    ngOnInit() {
        // id
        let token: string = localStorage.getItem('token');
        let tokenInfo = jwt_decode(token);
        this.kCollector = tokenInfo['id'];

        // load
        this.load();

        // city
        this.connApi.safeGet(this.urlCities).subscribe((response: HttpResponse<any>) => {
            console.log(response.body);
            this.lCities = response.body;
        });
        this.connApi.safeGet(this.urlCity).subscribe((response: HttpResponse<any>) => {
            this.oCollectorCity = response.body;
        });

        // states
        this.connApi.safeGet(this.urlStates + 1).subscribe((response: HttpResponse<any>) => {
            this.lStates = response.body;
        });
        this.connApi.safeGet(this.urlState).subscribe((response: HttpResponse<any>) => {
            this.oCollectorState = response.body;
        });

        // country
        this.connApi.safeGet(this.urlCountries).subscribe((response: HttpResponse<any>) => {
            this.lCountries = response.body;
        });

        // types
        this.connApi.safeGet(this.urlTypes).subscribe((response: HttpResponse<any>) => {
            this.lSelectType = response.body;
        });
        this.connApi.safeGet(this.urlType).subscribe((response: HttpResponse<any>) => {
            this.oSelectType = response.body;
        });

        // settings
        this.connApi.safeGet(this.urlSettings).subscribe((response: HttpResponse<any>) => {
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
        this.connApi.safePost(this.urlRanking, data).subscribe((response: HttpResponse<any>) => {
            // data
            this.lData = response.body;
            console.log(this.lData);

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

    onRegion($event: any) {
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
                this.load()
                break;
            case this.lRegion[3]:
                this.lSelectRegion = this.lCities;
                this.oSelectRegion = this.oCollectorCity;
                /*
                setTimeout(() => {
                    this.selectRegion.open();
                }, this.timeSelect);
                 */
                this.load()
                break;
        }

    }

    onTime($event: any) {
        if ($event['detail']['value'] == this.lTime[0]) {
            this.load();
        } else {
            this.load();
        }
    }

    onType($event: any) {
        if ($event['detail']['value'] == this.lType[0]) {
            this.load();
        } else {
            if (this.oSelectType == null) {
                setTimeout(() => {
                    this.selectType.open();
                }, this.timeSelect);
            } else {
                this.load();
            }

        }
    }

    getYearFromDate($date) {
        let date: Date = new Date($date);
        return date.getFullYear();
    }

    getNumber($number) {
        return $number.replace(',', '.');
    }

    isSelf($id) {
        return $id == this.kCollector;
    }

}
