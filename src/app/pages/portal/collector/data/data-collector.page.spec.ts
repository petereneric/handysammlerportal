import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DataCollectorPage } from './data-collector.page';

describe('DataCollectorPage', () => {
  let component: DataCollectorPage;
  let fixture: ComponentFixture<DataCollectorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCollectorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DataCollectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
