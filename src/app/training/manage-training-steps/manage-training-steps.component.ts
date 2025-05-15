import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from 'chart.js';

@Component({
  selector: 'app-manage-training-steps',
  standalone: false,
  templateUrl: './manage-training-steps.component.html',
  styleUrl: './manage-training-steps.component.css'
})
export class ManageTrainingStepsComponent implements OnInit {
    trainingPrograms: any[] = [];
    stepsForm: FormGroup;
    isLoading = false;
  
    constructor(private trainingService: TrainingService, private fb: FormBuilder) {
      this.stepsForm = this.fb.group({
        title: ['', [Validators.required, Validators.maxLength(255)]],
        description: ['', [Validators.required, Validators.maxLength(500)]],
        courses: ['', [Validators.required, Validators.minLength(1)]],
        resources: ['', Validators.required, Validators.minLength(1)],

      })
    }
  
    ngOnInit(): void {
      this.loadTrainingProgram();
    }
  
    loadTrainingProgram(): void {
      this.isLoading = true;
  
      this.trainingService.getRecommendations().subscribe({
        next: (res) => {
          this.trainingPrograms = res.trainingPrograms;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load training programs:', err);
          this.isLoading = false;
        }
      });
    }
}
