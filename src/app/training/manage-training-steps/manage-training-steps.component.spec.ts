import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTrainingStepsComponent } from './manage-training-steps.component';

describe('ManageTrainingStepsComponent', () => {
  let component: ManageTrainingStepsComponent;
  let fixture: ComponentFixture<ManageTrainingStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageTrainingStepsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTrainingStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
