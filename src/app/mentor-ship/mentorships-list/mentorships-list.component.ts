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
  activeMentorships: any[] = [];
  pendingMentorships: any[] = [];
  completedMentorships: any[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isLoading = true;
  feedbacks: any[] = [];
  showFeedbackPopup = false;

  constructor(private mentorShipService: MentorShipService){}

  ngOnInit(): void {
    this.loadMentors();
  }
  loadMentors(): void {
    this.mentorShipService.getAllMentorMentorships().subscribe({
      next: (response) => {
        this.mentorships = response;
        this.filterMentorships();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching mentorships:', error);
        this.isLoading = false;
      },
    });
  }

  filterMentorships(): void {
    this.activeMentorships = this.mentorships.filter(m => m.status === 'Active');
    this.pendingMentorships = this.mentorships.filter(m => m.status === 'Pending');
    this.completedMentorships = this.mentorships.filter(m => m.status === 'Completed');
  }

  updateStatus(status: string, mentorshipId: number): void {
    this.mentorShipService.updateMentorshipStatus(status, mentorshipId).subscribe({
      next: (response) => {
        this.successMessage = 'Status updated successfully';
        this.loadMentors();
        setTimeout(() => this.successMessage = null, 3000);
      },
      error: (error) => {
        console.error('Error updating mentorship status:', error);
      },
    });
  }

  loadMentorshipFeedbacks(mentorshipId: number): void {
    this.mentorShipService.getMentorshipFeedbacks(mentorshipId).subscribe({
      next: (response) => {
        this.feedbacks = response;
        this.showFeedbackPopup = true;
        console.log(response);
        
      },
      error: (error) => {
        console.error('Error loading mentorship feedbacks:', error);
      },
    });
  }

  closeFeedbackPopup(): void {
    this.showFeedbackPopup = false;
    this.feedbacks = [];
  }

  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push('★');
      } else {
        stars.push('☆');
      }
    }
    return stars;
  }
}
