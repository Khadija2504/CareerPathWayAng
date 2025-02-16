import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplyeeNavComponent } from './emplyee-nav.component';

describe('EmplyeeNavComponent', () => {
  let component: EmplyeeNavComponent;
  let fixture: ComponentFixture<EmplyeeNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmplyeeNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmplyeeNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
