import { Component, OnInit } from '@angular/core';
import { SkillAssessmentService } from './skill-assessment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-skill-assessment',
  standalone: false,
  templateUrl: './skill-assessment.component.html',
  styleUrl: './skill-assessment.component.css'
})
export class SkillAssessmentComponent implements OnInit{
  skills: any[] = [];
  selectedSkillId: number | null = null;
  assessment: any;
  errorMessage: string | null = null;
  assessments: any[] = [];

  constructor(private skillService: SkillAssessmentService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.skillService.getAllSkills().subscribe({
      next: (response) => {
        this.skills = response;
      },
      error: (error) => {
        console.error('Error fetching skills:', error);
      },
    });
    this.skillService.getAssessments().subscribe({
      next: (response) => {
        this.assessments = response;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load assessment results. Please try again.';
      },
    });
  }

  onSelectSkill(): void {
    if (this.selectedSkillId) {
      this.router.navigate(['/skill-assessment/interactive-questionnaires', this.selectedSkillId]);
    }
  }
}
