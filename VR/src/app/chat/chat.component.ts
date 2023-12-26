import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  chatVisible = false;
  profileVisible = false;
  darkMode = false;

  constructor() { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {

  }

  openProfile(): void {
    this.profileVisible = true;
  }

  closeProfile(): void {
    this.profileVisible = false;
  }
}
