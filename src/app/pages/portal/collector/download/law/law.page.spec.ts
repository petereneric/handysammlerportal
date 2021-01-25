import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LawPage } from './law.page';

describe('LawPage', () => {
  let component: LawPage;
  let fixture: ComponentFixture<LawPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LawPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
