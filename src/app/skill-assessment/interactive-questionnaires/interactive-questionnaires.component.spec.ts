import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveQuestionnairesComponent } from './interactive-questionnaires.component';

describe('InteractiveQuestionnairesComponent', () => {
  let component: InteractiveQuestionnairesComponent;
  let fixture: ComponentFixture<InteractiveQuestionnairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InteractiveQuestionnairesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractiveQuestionnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
