import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCareerPathComponent } from './update-career-path.component';

describe('UpdateCareerPathComponent', () => {
  let component: UpdateCareerPathComponent;
  let fixture: ComponentFixture<UpdateCareerPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCareerPathComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCareerPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
