import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from "socket.io-client";
import { SecurityService } from '../security/security.service';


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public message$: BehaviorSubject<any> = new BehaviorSubject({}); 

  constructor(private securityService: SecurityService) {}
  
  socket = io('http://localhost:3000');

  sendMessage(message: any) {
    this.securityService.user.asObservable().subscribe((res)=> {     
      this.socket.emit('message', message, res?.username);
    });    
  }

  getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };
}