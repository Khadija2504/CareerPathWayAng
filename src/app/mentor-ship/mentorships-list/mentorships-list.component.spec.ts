import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorshipsListComponent } from './mentorships-list.component';

describe('MentorshipsListComponent', () => {
  let component: MentorshipsListComponent;
  let fixture: ComponentFixture<MentorshipsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MentorshipsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorshipsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
