import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CreateCareerPathComponent } from './create-career-path.component';
import { CareerPathService } from '../career-path.service';
import { SkillAssessmentService } from '../../skill-assessment/skill-assessment.service';
import { CareerPath, Skill, User, CareerPathStep } from './career-path.model';

describe('CreateCareerPathComponent', () => {
  let component: CreateCareerPathComponent;
  let fixture: ComponentFixture<CreateCareerPathComponent>;
  let mockCareerPathService: jasmine.SpyObj<CareerPathService>;
  let mockSkillService: jasmine.SpyObj<SkillAssessmentService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    mockCareerPathService = jasmine.createSpyObj('CareerPathService', [
      'loadEmployees',
      'loadCareerPaths',
      'createCareerPath',
      'deleteCareerPath',
    ]);
    mockSkillService = jasmine.createSpyObj('SkillAssessmentService', [
      'getAllSkills',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CreateCareerPathComponent],
      providers: [
        FormBuilder,
        { provide: CareerPathService, useValue: mockCareerPathService },
        { provide: SkillAssessmentService, useValue: mockSkillService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCareerPathComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load skills, employees, and career paths on init', () => {
    const mockSkills: Skill[] = [{ id: 1, name: 'Angular' }];
    const mockEmployees: User[] = [{ id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' }];
    const mockCareerPaths: CareerPath[] = [
      { id: 1, name: 'Frontend Developer', description: 'Frontend career path', employeeId: 1, steps: [], done: false },
    ];

    mockSkillService.getAllSkills.and.returnValue(of(mockSkills));
    mockCareerPathService.loadEmployees.and.returnValue(of(mockEmployees));
    mockCareerPathService.loadCareerPaths.and.returnValue(of(mockCareerPaths));

    component.ngOnInit();

    expect(mockSkillService.getAllSkills).toHaveBeenCalled();
    expect(mockCareerPathService.loadEmployees).toHaveBeenCalled();
    expect(mockCareerPathService.loadCareerPaths).toHaveBeenCalled();
    expect(component.skills).toEqual(mockSkills);
    expect(component.employees).toEqual(mockEmployees);
    expect(component.existingCareerPaths).toEqual(mockCareerPaths);
    expect(component.isLoading).toBeFalse();
  });

  it('should add a step to the form', () => {
    component.addStep();
    expect(component.steps.length).toBe(1);

    component.addStep();
    expect(component.steps.length).toBe(2);
  });

  it('should remove a step from the form', () => {
    component.addStep();
    component.addStep();
    component.removeStep(0);
    expect(component.steps.length).toBe(1);
  });

  it('should not submit the form if it is invalid', () => {
    component.careerPathForm.setValue({
      name: '',
      description: '',
      employeeId: null,
      steps: [],
    });

    component.onSubmit();

    expect(mockCareerPathService.createCareerPath).not.toHaveBeenCalled();
  });

  it('should delete a career path', () => {
    const mockCareerPathId = 1;
    mockCareerPathService.deleteCareerPath.and.returnValue(of({}));

    component.deleteCareerPath(mockCareerPathId);

    expect(mockCareerPathService.deleteCareerPath).toHaveBeenCalledWith(
      mockCareerPathId
    );
    expect(component.existingCareerPaths).not.toContain(
      jasmine.objectContaining({ id: mockCareerPathId })
    );
  });

  it('should handle error when loading skills fails', () => {
    spyOn(console, 'error');
    mockSkillService.getAllSkills.and.returnValue(throwError('Error loading skills'));

    component.loadSkills();

    expect(console.error).toHaveBeenCalledWith('Failed to load skills:', 'Error loading skills');
  });

  it('should handle error when creating career path fails', () => {
    spyOn(console, 'error');
    mockCareerPathService.createCareerPath.and.returnValue(throwError('Error creating career path'));
  
    component.addStep();
  
    component.careerPathForm.setValue({
      name: 'Frontend Developer',
      description: 'Frontend career path',
      employeeId: 1,
      steps: [{ title: 'Learn Angular', description: 'Learn Angular basics', requiredSkillId: null }],
    });
  
    component.onSubmit();
  
    expect(console.error).toHaveBeenCalledWith('Failed to create career path:', 'Error creating career path');
  });

  it('should navigate to update career path page', () => {
    const mockCareerPathId = 1;
    component.update(mockCareerPathId);
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/career-path/update',
      mockCareerPathId,
    ]);
  });

  it('should open and close the modal and reset the form', () => {
    component.openModal();
    expect(component.showModal).toBeTrue();

    component.closeModal();
    expect(component.showModal).toBeFalse();
    expect(component.careerPathForm.pristine).toBeTrue();
    expect(component.steps.length).toBe(1);
  });

  it('should return the steps FormArray', () => {
    const steps = component.steps;
    expect(steps).toBeInstanceOf(FormArray);
  });

  it('should set isLoading to false after loading career paths', () => {
    const mockCareerPaths: CareerPath[] = [
      { id: 1, name: 'Frontend Developer', description: 'Frontend career path', employeeId: 1, steps: [], done: false },
    ];

    mockCareerPathService.loadCareerPaths.and.returnValue(of(mockCareerPaths));

    component.loadCareerPaths();

    expect(component.isLoading).toBeFalse();
  });
});
