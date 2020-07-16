import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchesCardListComponent } from './launches-card-list.component';

describe('LaunchesCardListComponent', () => {
  let component: LaunchesCardListComponent;
  let fixture: ComponentFixture<LaunchesCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaunchesCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchesCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
