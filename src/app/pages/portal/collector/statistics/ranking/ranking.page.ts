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
    urlCountries = 'collector/region/countries';
    urlStates = 'collector/region/states';
    urlCities = 'collector/region/cities';
    urlTypes = 'collector/types';
    urlType = 'collector/type';
    urlSettings = 'collector/settings'

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
    lCities = [];
    cSelectRegion: string = null;

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

        // regions
        this.connApi.safeGet(this.urlCities).subscribe((response: HttpResponse<any>) => {
            this.lCities = response.body;
        });
        this.connApi.safeGet(this.urlStates).subscribe((response: HttpResponse<any>) => {
            this.lStates = response.body;
        });
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
            let data = response.body
            this.bStatistics = data.bStatistics == 1
        })
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
        this.connApi.safePost(this.urlRanking, data).subscribe((response: HttpResponse<any>) => {
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

    onRegion($event: any) {
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

    onTime($event: any) {
        if ($event['detail']['value'] == this.lTime[0]) {
            this.load();
        } else {
            this.load()
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
