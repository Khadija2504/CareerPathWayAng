import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorNavComponent } from './mentor-nav.component';

describe('MentorNavComponent', () => {
  let component: MentorNavComponent;
  let fixture: ComponentFixture<MentorNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MentorNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
