import { Component, OnInit } from '@angular/core';
import { MentorShipService } from '../mentor-ship.service';

@Component({
  selector: 'app-mentorships-list',
  standalone: false,
  templateUrl: './mentorships-list.component.html',
  styleUrl: './mentorships-list.component.css'
})
export class MentorshipsListComponent implements OnInit{
  mentorships: any[] = [];
  successMessage: string | null= null;
  errorMessage: string | null = null;

  constructor(private mentorShipService: MentorShipService){}

  ngOnInit(): void {
    this.loadMentors();
  }
  loadMentors(): void {
    this.mentorShipService.getAllMentorMentorships().subscribe({
      next: (response) => {
        this.mentorships = response;
        console.log(response);
      },
      error: (error) => {
        console.error('Error fetching mentorships:', error);
      },
    });
  }
}
