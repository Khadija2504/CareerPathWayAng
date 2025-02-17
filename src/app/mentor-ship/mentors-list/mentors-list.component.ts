import { Component, OnInit } from '@angular/core';
import { MentorShipService } from '../mentor-ship.service';

@Component({
  selector: 'app-mentors-list',
  standalone: false,
  templateUrl: './mentors-list.component.html',
  styleUrl: './mentors-list.component.css'
})
export class MentorsListComponent implements OnInit{
  mentors: any[]= [];
  constructor(private mentorShipService: MentorShipService) {}
  ngOnInit(): void {
    this.mentorShipService.getAllMentors().subscribe({
      next: (response) => {
        this.mentors = response;
      },
      error: (error) => {
        console.error('Error fetching mentors:', error);
      },
    });
  }
}
