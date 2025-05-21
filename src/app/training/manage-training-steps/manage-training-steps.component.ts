import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CourseService } from '../../courses/course-service.service';
import { LibraryService } from '../../library/library.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-training-steps',
  standalone: false,
  templateUrl: './manage-training-steps.component.html',
  styleUrl: './manage-training-steps.component.css'
})
export class ManageTrainingStepsComponent implements OnInit {
  trainingPrograms: any[] = [];
  courses: any[] = [];
  resources: any[] = [];
  stepsForm!: FormGroup;
  isLoading = false;
  isModalOpen = false;
  selectedTraining: any = null;
  menteeId: number = 0;

  constructor(
    private trainingService: TrainingService, 
    private fb: FormBuilder, 
    private courseService: CourseService, 
    private resourceService: LibraryService,
    private route: ActivatedRoute

  ) {
    this.initForm();
  }

  ngOnInit(): void {
    const menteeIdParam = this.route.snapshot.paramMap.get('menteeId');
    if (menteeIdParam) {
      this.menteeId = parseInt(menteeIdParam, 10);
      if (!isNaN(this.menteeId)) {
        this.loadTrainingPrograms(this.menteeId);
      } else {
        console.error('Invalid menteeId in route');
      }
    } else {
      console.error('menteeId not found in route');
    }
    this.loadCourses();
    this.loadResources();
  }

  initForm(): void {
    this.stepsForm = this.fb.group({
      trainingId: [null, Validators.required],
      steps: this.fb.array([])
    });
  }

  get stepsArray(): FormArray {
    return this.stepsForm.get('steps') as FormArray;
  }

  createStepFormGroup(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.maxLength(1000), Validators.minLength(10)]],
      courseIds: [[], [Validators.required]],
      resourceIds: [[]]
    });
  }

  addStep(): void {
    this.stepsArray.push(this.createStepFormGroup());
  }

  removeStep(index: number): void {
    this.stepsArray.removeAt(index);
  }

  loadTrainingPrograms(menteeId: number): void {
    this.isLoading = true;

    this.trainingService.getMenteeTrainingPrograms(menteeId).subscribe({
      next: (res) => {
        this.trainingPrograms = res;
        console.log(this.trainingPrograms);
        this.isLoading = false; 
      },
      error: (err) => {
        console.error('Failed to load training programs:', err);
        this.isLoading = false;
      }
    });
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (response) => {
        this.courses = response;
      },
      error: (err) => {
        console.error('Failed to load courses: ', err);
      }
    });
  }

  loadResources(): void {
    this.resourceService.getAllResources().subscribe({
      next: (response) => {
        this.resources = response;
      },
      error: (err) => {
        console.error('Failed to load resources: ', err);
      }
    });
  }

  openStepsModal(training: any): void {
    this.selectedTraining = training;
    this.stepsForm.patchValue({ trainingId: training.id });
    
    this.stepsArray.clear();
    this.addStep();
    
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedTraining = null;
    this.stepsForm.reset();
  }

  onSubmit(): void {
    if (this.stepsForm.invalid) {
      this.markFormGroupTouched(this.stepsForm);
      return;
    }

    const formData = this.stepsForm.value;
    
    formData.steps.forEach((step: any) => {
      const stepData = {
        ...step,
        trainingId: formData.trainingId
      };
      console.log(stepData);
      
      
      this.trainingService.addSteps(stepData).subscribe({
        next: (response) => {
          console.log('Step added successfully:', response);
        },
        error: (err) => {
          console.error('Failed to add step:', err);
        }
      });
    });
    
    this.closeModal();
    this.loadTrainingPrograms(this.menteeId);
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(c => {
          if (c instanceof FormGroup) {
            this.markFormGroupTouched(c);
          } else {
            c.markAsTouched();
          }
        });
      }
    });
  }

  isFieldInvalid(stepIndex: number, fieldName: string): boolean {
    const control = this.stepsArray.at(stepIndex).get(fieldName);
    return control ? (control.invalid && (control.dirty || control.touched)) : false;
  }

  getErrorMessage(stepIndex: number, fieldName: string): string {
    const control = this.stepsArray.at(stepIndex).get(fieldName);
    if (!control) return '';
    
    if (control.hasError('required')) return 'This field is required';
    if (control.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Minimum length is ${minLength} characters`;
    }
    if (control.hasError('maxlength')) {
      const maxLength = control.errors?.['maxlength'].requiredLength;
      return `Maximum length is ${maxLength} characters`;
    }
    
    return '';
  }
}
