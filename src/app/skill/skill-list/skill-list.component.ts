import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillService } from '../skill.service';
import { Skill } from '../skill.model';

@Component({
  selector: 'app-skill-list',
  standalone: false,
  templateUrl: './skill-list.component.html',
  styleUrl: './skill-list.component.css'
})
export class SkillListComponent implements OnInit {
  skills: Skill[] = [];
  isAddSkillModalOpen = false;
  skillForm: FormGroup;

  constructor(private skillService: SkillService, private fb: FormBuilder) {
    this.skillForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.maxLength(500)]],
      category: ['', [Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.skillService.getAllSkills().subscribe({
      next: (skills) => (this.skills = skills),
      error: (error) => console.error('Error loading skills:', error)
    });
  }

  openAddSkillModal(): void {
    this.isAddSkillModalOpen = true;
  }

  closeAddSkillModal(): void {
    this.isAddSkillModalOpen = false;
    this.skillForm.reset();
  }

  onSubmit(): void {
    if (this.skillForm.invalid) return;

    this.skillService.addSkill(this.skillForm.value).subscribe({
      next: (skill) => {
        this.skills.push(skill);
        this.closeAddSkillModal();
      },
      error: (error) => console.error('Error adding skill:', error)
    });
  }

}
