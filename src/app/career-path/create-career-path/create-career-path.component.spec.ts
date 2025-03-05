import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCareerPathComponent } from './create-career-path.component';

describe('CreateCareerPathComponent', () => {
  let component: CreateCareerPathComponent;
  let fixture: ComponentFixture<CreateCareerPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCareerPathComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCareerPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
