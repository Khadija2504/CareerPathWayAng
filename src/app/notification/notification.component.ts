import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{

  notifications: any[] = [];
  constructor(private notificationService: NotificationService, private router: Router){}

  ngOnInit(): void {
    this.displayAllNotifications();
  }

  displayAllNotifications() : void {
    this.notificationService.getNotitfications().subscribe({
      next: (response)=> {
        this.notifications = response;
        console.log(response);
        this.readNotifications();
      }, error : (error) => {
        console.error("error fetching notifications: " , error);
        
      }
    });
  }

  readNotifications() : void {
    this.notificationService.readNotifications().subscribe({
      next: (response)=> {
        console.log(response);
      }, error : (error) => {
        console.error("error updating notifications: " , error);
        
      }
    });
  }
}
