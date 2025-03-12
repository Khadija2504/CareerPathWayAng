import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRankingComponent } from './employee-ranking.component';

describe('EmployeeRankingComponent', () => {
  let component: EmployeeRankingComponent;
  let fixture: ComponentFixture<EmployeeRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeRankingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
