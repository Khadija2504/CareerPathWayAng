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
  isUpdateSkillModalOpen = false;
  selectedSkill: Skill | null = null;
  skillForm: FormGroup;
  isLoading = true;

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
      next: (skills) => {this.skills = skills
        this.isLoading = false;
      },
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

  openUpdateSkillModal(skill: Skill): void {
    this.selectedSkill = skill;
    this.skillForm.patchValue({
      name: skill.name,
      description: skill.description,
      category: skill.category
    });
    this.isUpdateSkillModalOpen = true;
  }

  closeUpdateSkillModal(): void {
    this.isUpdateSkillModalOpen = false;
    this.skillForm.reset();
    this.selectedSkill = null;
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

  onUpdateSubmit(): void {
    if (this.skillForm.invalid || !this.selectedSkill) return;

    const updatedSkill = { ...this.selectedSkill, ...this.skillForm.value };
    this.skillService.updateSkill(updatedSkill, this.selectedSkill.id).subscribe({
      next: (skill) => {
        const index = this.skills.findIndex((s) => s.id === skill.id);
        if (index !== -1) this.skills[index] = skill;
        this.closeUpdateSkillModal();
      },
      error: (error) => console.error('Error updating skill:', error)
    });
  }


}
