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
  filteredSkills: Skill[] = [];
  isModalOpen = false;
  isLoading = true;
  questionnaireForm: FormGroup;
  visibleOptions: { [key: number]: number } = {};

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

  onCorrectSolutionChange(option: string): void {
    this.questionnaireForm.get("correctAnswer")?.setValue(option);
    console.log(this.questionnaireForm.get("correctAnswer")?.value);
  }

  private loadData(): void {
    this.service.getAllQuestionnaires().subscribe({
      next: (data) => {
        this.questionnaires = data;
        this.questionnaires.forEach((q, index) => {
          this.visibleOptions[index] = 3;
        });
        this.isLoading = false;

        this.service.getAllSkillss().subscribe({
          next: (skills) => {
            this.skills = skills;
            this.filterSkills();
          },
          error: (err) => this.handleError(err)
        });
      },
      error: (err) => this.handleError(err)
    });
  }

  private filterSkills(): void {
    const skillIdsWithQuestionnaires = new Set(this.questionnaires.map(q => q.skill?.id));
    this.filteredSkills = this.skills.filter(skill => !skillIdsWithQuestionnaires.has(skill.id));
  }

  loadMoreOptions(index: number): void {
    this.visibleOptions[index] += 3;
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
    const newQuestion: any = {
      questionText: formValue.questionText,
      options: formValue.options,
      correctAnswer: formValue.correctAnswer,
      skillId: +formValue.skillId,
    };

    this.service.createQuestionnaire(newQuestion).subscribe({
      next: (created) => {
        this.questionnaires = [created, ...this.questionnaires];
        this.filterSkills();
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

  public deleteQuestionnaire(id: number): void {
    this.service.deleteQuestionnaire(id).subscribe({
      next: (data) => {
        this.questionnaires = this.questionnaires.filter((questionnaire) => questionnaire.id !== id);
        this.filterSkills();
      },
      error: (err) => this.handleError(err)
    });
  }
}
