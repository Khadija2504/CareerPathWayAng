import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CareerPath, Skill } from '../create-career-path/career-path.model';
import { CareerPathService } from '../career-path.service';
import { SkillAssessmentService } from '../../skill-assessment/skill-assessment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-career-path',
  standalone: false,
  templateUrl: './update-career-path.component.html',
  styleUrl: './update-career-path.component.css'
})
export class UpdateCareerPathComponent implements OnInit {
  careerPathForm: FormGroup;
  careerPathId: number | null = null;
  skills: Skill[] = [];
  existingCareerPath: CareerPath | null = null;

  constructor(
    private fb: FormBuilder,
    private careerPathService: CareerPathService,
    private skillService: SkillAssessmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.careerPathForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      steps: this.fb.array([]),
    });

    this.route.params.subscribe((params) => {
      this.careerPathId = +params['careerPathId'];
      this.loadCareerPath();
    });

    // this.careerPathId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadSkills();
    this.loadCareerPath();
  }

  get steps(): FormArray {
    return this.careerPathForm.get('steps') as FormArray;
  }

  loadSkills(): void {
    this.skillService.getAllSkills().subscribe({
      next: (skills) => (this.skills = skills),
      error: (err) => console.error('Failed to load skills:', err),
    });
  }

  loadCareerPath(): void {
    this.careerPathService.getCareerPathById(this.careerPathId).subscribe({
      next: (careerPath) => {
        this.existingCareerPath = careerPath;
        this.populateForm(careerPath);
      },
      error: (err) => console.error('Failed to load career path:', err),
    });
  }

  populateForm(careerPath: CareerPath): void {
    this.careerPathForm.patchValue({
      name: careerPath.name,
      description: careerPath.description,
    });

    this.steps.clear();

    careerPath.steps.forEach((step) => {
      const stepForm = this.fb.group({
        id: [step.id],
        title: [step.title, Validators.required],
        description: [step.description],
        requiredSkillId: [step.requiredSkillId],
        done: [step.done],
      });
      this.steps.push(stepForm);
    });
  }

  addStep(): void {
    const stepForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      requiredSkillId: [null],
      done: [false],
    });
    this.steps.push(stepForm);
  }

  removeStep(index: number): void {
    this.steps.removeAt(index);
  }

  onSubmit(): void {
    if (this.careerPathForm.invalid) {
      return;
    }
  
    const updatedCareerPath: CareerPath = {
      id: this.careerPathId,
      ...this.careerPathForm.value,
      employeeId: this.existingCareerPath?.employee?.id,
    };
  
    this.careerPathService.updateCareerPath(updatedCareerPath, this.careerPathId).subscribe({
      next: (response) => {
        console.log('Career path updated successfully:', response);
        this.router.navigate(['/career-path/list']);
      },
      error: (validationErrors) => {
        if (Array.isArray(validationErrors)) {
          console.error('Validation errors:', validationErrors);
          this.displayValidationErrors(validationErrors);
        } else {
          console.error('Error updating career path:', validationErrors);
          alert('An unexpected error occurred. Please try again.');
        }
      },
    });
  }
  
  displayValidationErrors(errors: string[]): void {
    alert('Validation errors:\n' + errors.join('\n'));
  }
}
