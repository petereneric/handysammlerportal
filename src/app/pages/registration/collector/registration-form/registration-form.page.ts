import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.page.html',
  styleUrls: ['./registration-form.page.scss'],
})
export class RegistrationFormPage implements OnInit {

  loginFormCollector = this.fb.group({
    collection_nameCollector: [''],
    collection_typeCollector: [''],
    donation_idPartner: [''],
    donation_idCampaign: [''],
    contact_prename: [''],
    contact_surname: [''],
    contact_title: [''],
    contact_formal: [''],
    contact_email: [''],
    contact_emailCC: [''],
    contact_phoneFixedLine: [''],
    contact_phoneMobile: [''],
    shipping_nameOne: [''],
    shipping_nameTwo: [''],
    shipping_street: [''],
    shipping_streetNumber: [''],
    shipping_city: [''],
    shipping_zip: [''],
    shipping_country: [''],
  });

  typesCollector: any[] = [
    {
      id: 1,
      name: 'Schule',
    },
    {
      id: 2,
      name: 'Stadt',
    },
  ];

  contactTitles: any[] = [
    {
      name: 'Herr',
    },
    {
      name: 'Frau',
    },
    {
      name: 'Herr Dr.',
    },
    {
      name: 'Frau Dr.',
    },
  ];

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  compareWith = this.compareWithFn;
  bContactFormal: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onRegisterCollector() {

  }

  changeContactFormal() {
    this.bContactFormal = !this.bContactFormal;
  }
}
