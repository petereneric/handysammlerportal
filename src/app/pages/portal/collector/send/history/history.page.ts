import { Component, OnInit } from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ConnApiService} from '../../../../../services/conn-api/conn-api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  // Urls
  private urlRecords = 'collector/records'

  // Variables
  public records = []

  constructor(public connApi: ConnApiService) { }

  ngOnInit() {
    this.connApi.safeGet(this.urlRecords).subscribe((data: HttpResponse<any>) => {
      if (data.status == 200) {
        console.log(data);
        console.log("jooooo");
        this.records = data.body;
      }
    });
  }

}
