import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressMetricsComponent } from './progress-metrics.component';

describe('ProgressMetricsComponent', () => {
  let component: ProgressMetricsComponent;
  let fixture: ComponentFixture<ProgressMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressMetricsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
