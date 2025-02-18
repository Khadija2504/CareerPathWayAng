import { Component, OnInit } from '@angular/core';
import { MentorShipService } from '../mentor-ship.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  chatForm: FormGroup;
  receiverId: number | null = null;

  constructor(
    private mentorShipService: MentorShipService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.chatForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const mentorId = this.route.snapshot.paramMap.get('mentorId');
    if (mentorId !== null) {
      this.receiverId = +mentorId;
      this.loadMessages();
    } else {
      console.error('Mentor ID is missing in the route.');
    }
  }

  loadMessages(): void {
    if (this.receiverId !== null) {
      this.mentorShipService.getMessagesBetweenUsers(this.receiverId).subscribe(
        messages => this.messages = messages,
        error => console.error('Error loading messages', error)
      );
    } else {
      console.error('Receiver ID is not set.');
    }
  }

  sendMessage(): void {
    if (this.chatForm.valid && this.receiverId !== null) {
      const message = {
        senderId: 0,
        receiverId: this.receiverId,
        content: this.chatForm.value.content
      };

      this.mentorShipService.sendMessage(message).subscribe(
        response => {
          this.messages.push(response);
          this.chatForm.reset();
        },
        error => console.error('Error sending message', error)
      );
    } else {
      console.error('Form is invalid or Receiver ID is not set.');
    }
  }
}