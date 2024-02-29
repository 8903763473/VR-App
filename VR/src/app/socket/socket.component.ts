import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.scss'],
})
export class SocketComponent implements OnInit {

  messageText: any;
  messages: string[] = [];

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    // this.socketService.Listen('chat message').subscribe((data) => {
    //   console.log(data);
    // });
    // this.socketService.emit('chat message', this.messageText);
  }


  sendMessage() {
    // this.socketService.emit('chat message', this.messageText);
    // this.messageText = '';
  }
}
