import { Component } from '@angular/core';
import { ChatService } from '../../shared/services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule, 
    MatInputModule,
    MatFormFieldModule,    
    MatIconModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  newMessage!: string;
  messageList: string[] = [];
  isCurrentUser: boolean = false;

  constructor(private chatService: ChatService){}

  ngOnInit(){
    let user = localStorage.getItem('user');  

    this.chatService.getNewMessage().subscribe((message) => {
      this.isCurrentUser = JSON.parse(user as string).username === message.username;
      message.isCurrentUser = !!this.isCurrentUser;
      this.messageList.push(message);      
    })
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
}
