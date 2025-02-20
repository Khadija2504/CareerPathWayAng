import { Component, OnInit } from '@angular/core';
import { MentorShipService } from '../mentor-ship.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentors-list',
  standalone: false,
  templateUrl: './mentors-list.component.html',
  styleUrl: './mentors-list.component.css'
})
export class MentorsListComponent implements OnInit{
  mentors: any[]= [];
  successMessage: string | null= null;
  isExist: boolean | null= false;
  constructor(private mentorShipService: MentorShipService, private router: Router) {}
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

  startChat(mentorId: number): void {
    this.router.navigate(['/mentorShip-coaching/chat']);
  }

  createMentorship(mentorId: number): void{
    const mentorshipData = {
      mentorId: mentorId,
      status: "Active",
    };

    this.mentorShipService.creatMentorship(mentorshipData).subscribe({
      next: (response) => {
        this.successMessage = 'mentroship created successfully!';
        console.log(response);
      },
      error: (error) => {
        console.error('Error sending the mentorhsip data:', error);
      }
    });
  }

  isMentorshipExist(mentorId: number): void{

    this.mentorShipService.isMentorshipExist(mentorId).subscribe({
      next: (response) => {
        this.isExist = response;
        console.log(response);
      },
      error: (error) => {
        console.error('Error sending the mentorhsip data:', error);
      }
    });
  }

  isConversationExist(mentorId: number): void {
    this.isMentorshipExist(mentorId);
    if(this.isExist == true){
      this.startChat(mentorId);
    }
  }

  isMentorExist(mentorId: number): void{
    this.isMentorshipExist(mentorId);
    if(this.isExist == false) {
      this.createMentorship(mentorId);
    }
  }
}
