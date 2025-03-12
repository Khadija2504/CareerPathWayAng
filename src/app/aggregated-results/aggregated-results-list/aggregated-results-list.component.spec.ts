import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatedResultsListComponent } from './aggregated-results-list.component';

describe('AggregatedResultsListComponent', () => {
  let component: AggregatedResultsListComponent;
  let fixture: ComponentFixture<AggregatedResultsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AggregatedResultsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggregatedResultsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
