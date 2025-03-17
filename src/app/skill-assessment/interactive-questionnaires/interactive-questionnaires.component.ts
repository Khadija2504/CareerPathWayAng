import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillAssessmentService } from '../skill-assessment.service';

@Component({
  selector: 'app-interactive-questionnaires',
  standalone: false,
  templateUrl: './interactive-questionnaires.component.html',
  styleUrl: './interactive-questionnaires.component.css'
})
export class InteractiveQuestionnairesComponent {
  skillId: number;
  questions: any[] = [];
  responses: string[] = [];
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private skillService: SkillAssessmentService,
    private router: Router
  ) {
    this.skillId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.skillService.getQuestionnairesBySkillId(this.skillId).subscribe({
      next: (response) => {
        this.questions = response;
        this.responses = new Array(response.length).fill('');
      },
      error: (error) => {
        this.errorMessage = 'Failed to load questions. Please try again.';
      },
    });
  }

  onSubmit(): void {
    this.skillService.submitQuestionnaireResponses(this.skillId, this.responses).subscribe({
      next: (assessment) => {
        this.router.navigate(['/skill-assessment', assessment.id]);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to submit responses. Please try again.';
      },
    });
  }

  getCompletedQuestions(): number {
    return this.responses.filter(response => response !== undefined && response !== null && response !== '').length;
  }
}
