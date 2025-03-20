import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CareerPathsListComponent } from './career-paths-list.component';
import { CareerPathService } from '../career-path.service';
import { of, throwError } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CareerPath, Certification } from '../create-career-path/career-path.model';

describe('CareerPathsListComponent', () => {
  let component: CareerPathsListComponent;
  let fixture: ComponentFixture<CareerPathsListComponent>;
  let careerPathServiceMock: any;
  let sanitizerMock: any;

  beforeEach(async () => {
    careerPathServiceMock = {
      loadEmployeeCareerPaths: jasmine.createSpy('loadEmployeeCareerPaths').and.returnValue(of([
        { id: 1, name: "Career 1", description: "Desc", employeeId: 1, steps: [{ id: 1, done: false }, { id: 2, done: true }], done: false },
      ] as CareerPath[])),
      updateStepStatus: jasmine.createSpy('updateStepStatus').and.returnValue(of({})),
      completeCareerPath: jasmine.createSpy('completeCareerPath').and.returnValue(of({ certificateUrl: 'https://example.com/certificate.pdf' } as Certification)),
      getCareerPathCertification: jasmine.createSpy('getCareerPathCertification').and.returnValue(of({ certificateUrl: 'https://example.com/certificate.pdf' } as Certification))
    };

    sanitizerMock = {
      bypassSecurityTrustResourceUrl: jasmine.createSpy('bypassSecurityTrustResourceUrl').and.callFake((url: string) => url),
    };

    await TestBed.configureTestingModule({
      declarations: [CareerPathsListComponent],
      providers: [
        { provide: CareerPathService, useValue: careerPathServiceMock },
        { provide: DomSanitizer, useValue: sanitizerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CareerPathsListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load career paths on initialization', () => {
    fixture.detectChanges();
    expect(careerPathServiceMock.loadEmployeeCareerPaths).toHaveBeenCalled();
    expect(component.existingCareerPaths.length).toBeGreaterThan(0);
    expect(component.isLoading).toBeFalse();
  });

  it('should update step status and reload career paths', () => {
    fixture.detectChanges();
    component.updateStep(1, true);
    expect(careerPathServiceMock.updateStepStatus).toHaveBeenCalledWith(true, 1);
    expect(careerPathServiceMock.loadEmployeeCareerPaths).toHaveBeenCalled();
  });

  it('should fetch and display certification', () => {
    fixture.detectChanges();
    component.viewCertificate(1);
    expect(careerPathServiceMock.getCareerPathCertification).toHaveBeenCalledWith(1);
    expect(component.safeCertificateUrl).toEqual('https://example.com/certificate.pdf');
    expect(component.isLightboxOpen).toBeTrue();
  });

  it('should close lightbox', () => {
    component.closeLightbox();
    expect(component.isLightboxOpen).toBeFalse();
    expect(component.safeCertificateUrl).toBeNull();
    expect(component.selectedCareerPathId).toBeNull();
  });

  it('should count completed steps correctly', () => {
    const path = { steps: [{ done: true }, { done: false }, { done: true }] } as CareerPath;
    expect(component.getCompletedStepsCount(path)).toBe(2);
  });

  it('should handle errors when loading career paths', () => {
    careerPathServiceMock.loadEmployeeCareerPaths.and.returnValue(throwError(() => new Error('API error')));
    spyOn(console, 'error');
    component.loadCareerPaths();
    expect(console.error).toHaveBeenCalledWith('Failed to load career paths:', jasmine.any(Error));
  });

  it('should handle errors when updating step status', () => {
    careerPathServiceMock.updateStepStatus.and.returnValue(throwError(() => new Error('API error')));
    spyOn(console, 'error');
    component.updateStep(1, true);
    expect(console.error).toHaveBeenCalledWith('Failed to update step status:', jasmine.any(Error));
  });

  it('should handle errors when fetching certification', () => {
    careerPathServiceMock.getCareerPathCertification.and.returnValue(throwError(() => new Error('API error')));
    spyOn(console, 'error');
    component.viewCertificate(1);
    expect(console.error).toHaveBeenCalledWith('Failed to fetch certificate URL:', jasmine.any(Error));
  });
});
