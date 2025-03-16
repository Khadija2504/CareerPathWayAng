import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
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
export class MentorsListComponent implements OnInit, OnDestroy, AfterViewChecked  {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  mentors: any[] = [];
  displayedMentors: any[] = [];
  activeMentorships: any[] = [];
  displayedActiveMentorships: any[] = [];
  pageSize = 3;
  currentMentorsPage = 1;
  currentActiveMentorshipsPage = 1;

  successMessage: string | null = null;
  isExist: boolean | null = false;
  messages: any[] = [];
  chatForm: FormGroup;
  receiverId: number | null = null;
  loggedinUser: any = null;
  isLoading = true;
  errorMessage: string | null = null;
  conversations: any[] = [];
  isConversationsOpen: boolean = false;
  isMessagesOpen: boolean = false;

  isFeedbackDialogOpen = false;
  feedbackForm: FormGroup;
  selectedMentorshipId: number | null = null;
  feedbackSubmitted = false;
  feedbackSuccess = false;
  feedbackMessage = '';

  unreadMessagesCount: number = 0;
  unreadConversationMessagesCount: number = 0;
  private pollingInterval: any;

  constructor(
    private mentorShipService: MentorShipService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private profileService: ProfileService,
  ) {
    this.chatForm = this.fb.group({
      content: ['', Validators.required]
    });
    this.feedbackForm = this.fb.group({
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      feedback: ['', [Validators.required, Validators.maxLength(1000)]]
    });
  }

  ngOnInit(): void {
    this.mentorShipService.getAllMentors().subscribe({
      next: (response) => {
        this.mentors = response;
        this.loadMoreMentors();
      },
      error: (error) => {
        console.error('Error fetching mentors:', error);
      },
    });
    console.log(this.messages);
    
    this.fetchUserDetails();
    this.loadActiveMenteeMentorships();
    this.fetchUnreadMessagesCount();
    this.startPolling();
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  openFeedbackDialog(mentorshipId: number): void {
    this.selectedMentorshipId = mentorshipId;
    this.isFeedbackDialogOpen = true;
    this.feedbackForm.reset();
    this.feedbackSubmitted = false;
  }

  closeFeedbackDialog(): void {
    this.isFeedbackDialogOpen = false;
    this.selectedMentorshipId = null;
  }

  setRating(rating: number): void {
    this.feedbackForm.patchValue({ rating });
  }

  submitFeedback(): void {
    if (this.feedbackForm.valid && this.selectedMentorshipId) {
      const feedbackData = {
        mentorshipId: this.selectedMentorshipId,
        ...this.feedbackForm.value
      };

      this.mentorShipService.createFeedback(feedbackData).subscribe({
        next: (response) => {
          this.feedbackSuccess = true;
          this.feedbackMessage = 'Feedback submitted successfully!';
          this.feedbackSubmitted = true;
          console.log(response);
          
          setTimeout(() => this.closeFeedbackDialog(), 2000);
        },
        error: (error) => {
          this.feedbackSuccess = false;
          this.feedbackMessage = 'Error submitting feedback. Please try again.';
          this.feedbackSubmitted = true;
        }
      });
    }
  }


  loadMoreMentors(): void {
    const startIndex = (this.currentMentorsPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedMentors = this.mentors.slice(0, endIndex);
    this.currentMentorsPage++;
  }

  loadMoreActiveMentorships(): void {
    const startIndex = (this.currentActiveMentorshipsPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedActiveMentorships = this.activeMentorships.slice(0, endIndex);
    this.currentActiveMentorshipsPage++;
  }

  loadActiveMenteeMentorships(): void {
    this.mentorShipService.getActiveMenteeMentorships().subscribe({
      next: (response) => {
        this.activeMentorships = response;
        this.conversations = response;
  
        this.conversations.forEach((conversation) => {
          this.fetchUnreadConversationMessagesCount(conversation);
        });
  
        this.displayedActiveMentorships = this.activeMentorships.slice(0, this.pageSize);
      },
      error: (error) => {
        console.error('Error fetching active mentee mentorships:', error);
      },
    });
  }

  createMentorship(mentorId: number): void {
    const mentorshipData = {
      mentorId: mentorId,
      status: "Active",
    };

    this.mentorShipService.creatMentorship(mentorshipData).subscribe({
      next: (response) => {
        this.successMessage = 'Mentorship created successfully!';
        console.log(response);
      },
      error: (error) => {
        console.error('Error sending the mentorship data:', error);
      }
    });
  }

  isMentorshipExist(mentorId: number): void {
    this.mentorShipService.isMentorshipExist(mentorId).subscribe({
      next: (response) => {
        this.isExist = response;
        console.log(response);
      },
      error: (error) => {
        console.error('Error checking mentorship existence:', error);
      }
    });
  }

  isConversationExist(mentorId: number): void {
    this.isMentorshipExist(mentorId);
    if (this.isExist == true) {
      this.startChat(mentorId);
    }
  }

  isMentorExist(mentorId: number): void {
    this.isMentorshipExist(mentorId);
    if (this.isExist == false) {
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

  startChat(mentorId: number): void {
    this.loadMessages(mentorId);
  }

  loadMessages(mentorId: number): void {
    if (mentorId !== null) {
      this.receiverId = mentorId;
      this.mentorShipService.getMessagesBetweenUsers(mentorId).subscribe({
        next: (response) => {
          this.messages = response;
          this.isMessagesOpen = true;
          this.scrollToBottom();
        },
        error: (error) => {
          console.error('Error fetching messages:', error);
        },
      });
    } else {
      console.error('Receiver ID is not set.');
    }
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
          this.scrollToBottom();
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

  startPolling(): void {
    this.fetchUnreadMessagesCount();
    this.pollingInterval = setInterval(() => {
      this.fetchUnreadMessagesCount();
      this.conversations.forEach((conversation) => {
        this.fetchUnreadConversationMessagesCount(conversation);
      });
    }, 5000);
  }

  stopPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  fetchUnreadMessagesCount(): void {
    this.mentorShipService.unreadMessages().subscribe({
      next: (response: any) => {
        this.unreadMessagesCount = response.length;
      },
      error: (error) => {
        console.error('Error fetching unread messages:', error);
      },
    });
  }

  fetchUnreadConversationMessagesCount(conversation: any): void {
    this.mentorShipService.getUnreadMessagesBetweenUsers(conversation.mentor.id).subscribe({
      next: (response: any) => {
  
        conversation.unreadCount = response.length;        
  
        console.log("Unread Messages for Conversation:", conversation);
      },
      error: (error) => {
        console.error('Error fetching unread messages:', error);
      },
    });
  }
}
