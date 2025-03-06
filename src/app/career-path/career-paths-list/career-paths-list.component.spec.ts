import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerPathsListComponent } from './career-paths-list.component';

describe('CareerPathsListComponent', () => {
  let component: CareerPathsListComponent;
  let fixture: ComponentFixture<CareerPathsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CareerPathsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerPathsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
