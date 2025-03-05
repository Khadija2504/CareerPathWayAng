import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CareerPath, Skill } from './career-path.model';
import { CareerPathService } from '../career-path.service';
import { SkillAssessmentService } from '../../skill-assessment/skill-assessment.service';

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
  showModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private careerPathService: CareerPathService,
    private skillService: SkillAssessmentService
  ) {
    this.careerPathForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      steps: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadSkills();
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
}
