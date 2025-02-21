import { Component, OnInit } from '@angular/core';
import { MentorShipService } from '../mentor-ship.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../profile/profile.service';

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
  messages: any[] = [];
  chatForm: FormGroup;
  receiverId: number | null = null;
  loggedinUser: any = null;
  isLoading = true;
  errorMessage: string | null = null;
  conversations : any[] = [];
  mentor: number | null = null;
  isConversationsOpen: boolean = false;
  isMessagesOpen: boolean = false;

  constructor(private mentorShipService: MentorShipService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private profileService: ProfileService,
        private router: Router
  ) {
    this.chatForm = this.fb.group({
      content: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.mentorShipService.getAllMentors().subscribe({
      next: (response) => {
        this.mentors = response;
      },
      error: (error) => {
        console.error('Error fetching mentors:', error);
      },
    });
    this.fetchUserDetails();
    this.loadMentors();
  }

  // startChat(mentorId: number): void {
  //   this.router.navigate(['/mentorShip-coaching/chat']);
  // }

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

  fetchUserDetails(): void {
    this.profileService.getUserDetails().subscribe({
      next: (response) => {
        this.loggedinUser = response.id;
        console.log(this.loggedinUser);
        
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch user details. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching user details:', error);
      },
    });
  }

  loadMessages(mentorId: number): void {
    if (mentorId !== null) {
      this.receiverId = mentorId
      this.mentorShipService.getMessagesBetweenUsers(mentorId).subscribe({
        next: (response) => {
          this.messages = response;
          this.isMessagesOpen = true; 
        },
        error: (error) => {
          console.error('Error fetching messages:', error);
        },
      });
    } else {
      console.error('Receiver ID is not set.');
    }
  }

  loadMentors(): void {
    this.mentorShipService.getAllMentorships().subscribe({
      next: (response) => {
        this.conversations = response;
        console.log(response);
        
      },
      error: (error) => {
        console.error('Error fetching conversations:', error);
      },
    });
  }

  startChat(mentorId: number): void {
    this.loadMessages(mentorId);
  }

  sendMessage(): void {
    if (this.chatForm.valid && this.receiverId !== null && this.loggedinUser) {
      const message = {
        senderId: this.loggedinUser.id,
        receiverId: this.receiverId,
        content: this.chatForm.value.content
      };

      this.mentorShipService.sendMessage(message).subscribe({
        next: (response) => {
          this.messages.push(response);
          this.chatForm.reset();
        },
        error: (error) => {
          console.error('Error sending message:', error);
        }
      });
    } else {
      console.error('Form is invalid, Receiver ID is not set, or User details are missing.');
    }
  }

  toggleConversations(): void {
    this.isConversationsOpen = !this.isConversationsOpen;
  }

  closeMessages(): void {
    this.isMessagesOpen = false;
  }
}
