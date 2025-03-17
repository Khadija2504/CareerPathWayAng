import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { MentorShipService } from '../mentor-ship.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../profile/profile.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked  {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  messages: any[] = [];
  chatForm: FormGroup;
  receiverId: number | null = null;
  loggedinUser: any = null;
  isLoading = true;
  errorMessage: string | null = null;
  conversations: any[] = [];
  isConversationsOpen: boolean = false;
  isMessagesOpen: boolean = false;
  isFirstLoad: boolean = true;

  constructor(
    private mentorShipService: MentorShipService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router,
    private authService: AuthService
  ) {
    this.chatForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchUserDetails();
    this.loadConversations();
    this.sortConversations();
  }

  hasRole(role: string): boolean {
    return this.authService.getUserRole() === role;
  }

  ngAfterViewChecked(): void {
    if (this.isFirstLoad && this.isMessagesOpen) {
      this.scrollToBottom();
      this.isFirstLoad = false;
    }
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
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

  loadConversations(): void {
    this.mentorShipService.getAllEmployeeMentorships().subscribe({
      next: (response: any[]) => {
        this.conversations = response.sort((a: any, b: any) => {
          const dateA = new Date(a.lastMessageDate || 0).getTime();
          const dateB = new Date(b.lastMessageDate || 0).getTime();
          return dateB - dateA;
        });
  
        if (this.conversations.length > 0 && !this.receiverId) {
          const lastConversation = this.conversations[0];
          this.startChat(lastConversation.mentor.id);
        }
      },
      error: (error) => {
        console.error('Error fetching conversations:', error);
      },
    });
  }  

  startChat(mentorId: number): void {
    this.receiverId = mentorId;
    this.loadMessages(mentorId);
    const conversation = this.conversations.find(c => c.mentor.id === mentorId);
    if (conversation) {
      conversation.lastMessageDate = new Date().toISOString();
    }
  }

  loadMessages(mentorId: number): void {
    if (mentorId !== null) {
      console.log(mentorId);
      
      this.receiverId = mentorId
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
          const conversation = this.conversations.find(c => c.mentor.id === this.receiverId);
          if (conversation) {
            conversation.lastMessageDate = new Date().toISOString();
            this.sortConversations();
          }
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

  private sortConversations(): void {
    this.conversations = this.conversations.sort((a: any, b: any) => {
      const dateA = new Date(a.lastMessageDate || 0).getTime();
      const dateB = new Date(b.lastMessageDate || 0).getTime();
      return dateB - dateA;
    });
  }    

  toggleConversations(): void {
    this.isConversationsOpen = !this.isConversationsOpen;
  }

  closeMessages(): void {
    this.isMessagesOpen = false;
  }
}