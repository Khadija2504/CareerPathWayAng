import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CareerPath, Skill, User } from './career-path.model';
import { CareerPathService } from '../career-path.service';
import { SkillAssessmentService } from '../../skill-assessment/skill-assessment.service';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-career-path',
  standalone: false,
  templateUrl: './create-career-path.component.html',
  styleUrls: ['./create-career-path.component.css'],
})
export class CreateCareerPathComponent implements OnInit {
  careerPathForm: FormGroup;
  existingCareerPaths: CareerPath[] = [];
  skills: Skill[] = [];
  employees: User[] = [];
  showModal: boolean = false;
  faTrash = faTrash;

  constructor(
    private fb: FormBuilder,
    private careerPathService: CareerPathService,
    private skillService: SkillAssessmentService,
    private router: Router,
  ) {
    this.careerPathForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      employeeId: [Validators.required],
      steps: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadSkills();
    this.loadEmployees();
    this.loadCareerPaths();
    this.addStep();
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

  loadEmployees(): void {
    this.careerPathService.loadEmployees().subscribe({
      next: (employees) => (this.employees = employees),
      error: (err) => console.error('Failed to load employees:', err)
    });
  }

  loadCareerPaths(): void {
    this.careerPathService.loadCareerPaths().subscribe({
      next: (careerPath) => (this.existingCareerPaths = careerPath),
      error: (err) => console.error('Failed to load career paths:', err)
    });
  }

  addStep(): void {
    const stepForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      requiredSkillId: [null],
    });
    this.steps.push(stepForm);
  }

  removeStep(index: number): void {
    this.steps.removeAt(index);
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
  }

  onSubmit(): void {
    if (this.careerPathForm.invalid) {
      return;
    }

    const careerPath: CareerPath = this.careerPathForm.value;
    console.log(careerPath);
    this.careerPathService.createCareerPath(careerPath).subscribe({
      next: (createdPath) => {
        this.existingCareerPaths.push(createdPath);
        console.log(createdPath);
        this.closeModal();
      },
      error: (err) => console.error('Failed to create career path:', err),
    });
  }

  resetForm(): void {
    this.careerPathForm.reset();
    this.steps.clear();
    this.addStep();
  }

  update(careerPathId: any): void {
    this.router.navigate(['/career-path/update', careerPathId]);
  }

  deleteCareerPath(careerPathId: any): void {
    this.careerPathService.deleteCareerPath(careerPathId).subscribe({
      next: (data) => {
        console.log('Career path deleted successfully:', data);
        this.existingCareerPaths = this.existingCareerPaths.filter(
          (path) => path.id !== careerPathId
        );
        alert('Career path deleted successfully!');
      },
      error: (err) => {
        console.error('Failed to delete career path:', err);
        alert('Failed to delete career path. Please try again.');
      },
    });
  }
}
