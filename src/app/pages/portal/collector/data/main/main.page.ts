import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {ConnApiService} from "../../../../../services/conn-api/conn-api.service";

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

    // Urls
    private urlCollector = 'collector/collector'

    // FormBuilder
    fgCollector = this.formBuilder.group({
        cName: ['cName'],
        cNameDetails: ['cNameDetails'],
        cStreet: ['cStreet'],
        cStreetNumber: ['cStreetNumber'],
        cZip: ['cZip'],
        cCity: ['cCity'],
        cCountry: ['cCountry'],
        cPrenamePerson: ['cPrenamePerson'],
        cSurnamePerson: ['cSurnamePerson'],
        cTitlePerson: ['cTitlePerson'],
        bAdressFormally: ['bAdressFormally'],
        cPhoneFixedLine: ['cPhoneFixedLine'],
        cPhoneMobile: ['cPhoneMobile'],
        cEmail: ['cEmail'],
        cEmailCC: ['cEmailCC'],
        cShippingNameOne: ['cShippingNameOne'],
        cShippingNameTwo: ['cShippingNameTwo'],
        cShippingNameThree: ['cShippingNameThree'],
        cShippingStreet: ['cShippingStreet'],
        cShippingStreetNumber: ['cShippingStreetNumber'],
        cShippingZip: ['cShippingZip'],
        cShippingCity: ['cShippingCity'],
        cShippingCountry: ['cShippingCountry'],
    });

    // Variables
    cType

    constructor(private connApi: ConnApiService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.connApi.safeGet(this.urlCollector).subscribe((response) => {
            let collector = response.body;

            // Update
            this.fgCollector.controls['cName'].setValue(collector.cName);
            this.fgCollector.controls['cNameDetails'].setValue(collector.cNameDetails);
            this.fgCollector.controls['cStreet'].setValue(collector.cStreet);
            this.fgCollector.controls['cStreetNumber'].setValue(collector.cStreetNumber);
            this.fgCollector.controls['cZip'].setValue(collector.cZip);
            this.fgCollector.controls['cCity'].setValue(collector.cCity);
            this.fgCollector.controls['cCountry'].setValue(collector.cCountry);
            this.fgCollector.controls['cPrenamePerson'].setValue(collector.cPrenamePerson);
            this.fgCollector.controls['cSurnamePerson'].setValue(collector.cSurnamePerson);
            this.fgCollector.controls['cTitlePerson'].setValue(collector.cTitlePerson);
            this.fgCollector.controls['bAdressFormally'].setValue(collector.bAdressFormally);
            this.fgCollector.controls['cPhoneFixedLine'].setValue(collector.cPhoneFixedLine);
            this.fgCollector.controls['cPhoneMobile'].setValue(collector.cPhoneMobile);
            this.fgCollector.controls['cEmail'].setValue(collector.cEmail);
            this.fgCollector.controls['cEmailCC'].setValue(collector.cEmailCC);
            this.fgCollector.controls['cShippingNameOne'].setValue(collector.cShippingNameOne);
            this.fgCollector.controls['cShippingNameTwo'].setValue(collector.cShippingNameTwo);
            this.fgCollector.controls['cShippingNameThree'].setValue(collector.cShippingNameThree);
            this.fgCollector.controls['cShippingStreet'].setValue(collector.cShippingStreet);
            this.fgCollector.controls['cShippingStreetNumber'].setValue(collector.cShippingStreetNumber);
            this.fgCollector.controls['cShippingZip'].setValue(collector.cShippingZip);
            this.fgCollector.controls['cShippingCity'].setValue(collector.cShippingCity);
            this.fgCollector.controls['cShippingCountry'].setValue(collector.cShippingCountry);

        })
    }

    onSave() {

    }

    onSelectedType() {

    }
}
