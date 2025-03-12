import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionnaireService } from '../questionnaire.service';
import { Component, OnInit } from '@angular/core';
import { Questionnaire, Skill } from '../questionnaire.model';

@Component({
  selector: 'app-questionnaire-list',
  standalone: false,
  templateUrl: './questionnaire-list.component.html',
  styleUrl: './questionnaire-list.component.css'
})
export class QuestionnaireListComponent implements OnInit {
  questionnaires: Questionnaire[] = [];
  skills: Skill[] = [];
  isModalOpen = false;
  isLoading = true;
  questionnaireForm: FormGroup;

  constructor(
    private service: QuestionnaireService,
    private fb: FormBuilder
  ) {
    this.questionnaireForm = this.fb.group({
      questionText: ['', [Validators.required, Validators.minLength(10)]],
      newOption: [''],
      options: this.fb.array([], [Validators.required, Validators.minLength(2)]),
      correctAnswer: [''],
      skillId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  onCorrectSolutionChange(option: String): void {
    this.questionnaireForm.get("correctAnswer")?.setValue(option);
    console.log(this.questionnaireForm.get("correctAnswer")?.value);
  }

  private loadData(): void {
    this.service.getAllQuestionnaires().subscribe({
      next: (data) => {
        this.questionnaires = data;
        this.isLoading = false;
      },
      error: (err) => this.handleError(err)
    });

    this.service.getAllSkillss().subscribe({
      next: (skills) => this.skills = skills,
      error: (err) => this.handleError(err)
    });
  }

  get optionsArray(): FormArray {
    return this.questionnaireForm.get('options') as FormArray;
  }

  openAddModal(): void {
    this.isModalOpen = true;
  }

  closeAddModal(): void {
    this.isModalOpen = false;
    this.questionnaireForm.reset({ difficulty: 'Medium' });
    this.optionsArray.clear();
  }

  addOption(): void {
    const newOption = this.questionnaireForm.get('newOption')?.value?.trim();
    if (newOption) {
      this.optionsArray.push(this.fb.control(newOption));
      this.questionnaireForm.get('newOption')?.reset();
    }
  }

  removeOption(index: number): void {
    this.optionsArray.removeAt(index);
    if (this.questionnaireForm.value.correctAnswer === index) {
      this.questionnaireForm.patchValue({ correctAnswer: '' });
    }
  }

  onSubmit(): void {
    if (this.questionnaireForm.invalid) return;
  
    const formValue = this.questionnaireForm.value;
    console.log('Form Value:', formValue);
  
    const newQuestion: any = {
      questionText: formValue.questionText,
      options: formValue.options,
      correctAnswer: formValue.correctAnswer,
      skillId: +formValue.skillId,
    };
  
    console.log('New Question:', newQuestion);
  
    this.service.createQuestionnaire(newQuestion).subscribe({
      next: (created) => {
        this.questionnaires = [created, ...this.questionnaires];
        this.closeAddModal();
      },
      error: (err) => this.handleError(err)
    });
  }

  private handleError(error: any): void {
    console.error('Error:', error);
    this.isLoading = false;
  }

  get difficultyColor(): { [key: string]: string } {
    return {
      Easy: 'bg-green-100 text-green-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      Hard: 'bg-red-100 text-red-800'
    };
  }
}
