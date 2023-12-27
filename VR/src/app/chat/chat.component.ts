import { Component, OnInit } from '@angular/core';
import { Apiservice } from '../api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {

  chatVisible = false;
  profileVisible = false;
  darkMode = false;
  openChat = false
  allUsers: any = []
  myConversation: any = []
  arr: any = []
  AllChat: any = []
  clicked: any
  myId: any
  selectedChat: any
  screenWidth: any
  constructor(public api: Apiservice, public router: Router) {
    setInterval(() => {
      this.screenWidth = window.innerWidth
    }, 500)
  }

  ionViewWillEnter() {
    this.myId = localStorage.getItem('userId')
    this.getUsers();
  }

  getUsers() {
    this.api.getAllUsers().subscribe({
      next: (res => {
        this.allUsers = res;

        this.allUsers = this.allUsers.filter(res1 => {
          return this.myId !== res1.userId
        })

        this.getOnlineUsers();
      }),
      error: (err => {
        console.log(err);
      })
    })
  }

  getOnlineUsers() {
    this.api.getOnlineusers().subscribe({
      next: ((res: any) => {
        this.allUsers.map(res1 => {
          res.map(res2 => {
            if (res1.userId == res2.id) {
              Object.assign(res1, { status: 'online' })
            }
          })
        })

        this.allUsers.sort((a, b) => {
          if (a.status === 'online' && b.status !== 'online') {
            return -1;
          } else if (a.status !== 'online' && b.status === 'online') {
            return 1;
          } else {
            return 0;
          }
        });
        console.log(this.allUsers);

      }),
      error: (err => {
        console.log(err);
      })
    })
  }

  SelectChat(data) {
    this.clicked = data.id
    this.selectedChat = data
    console.log(this.selectedChat);
    this.openChat = true
    this.allChat(data.userId, this.myId)
  }

  allChat(opponent, me) {
    this.AllChat = []
    this.AllChat.push({ 'id': opponent }, { 'id': me })
    this.AllChat.map(res => {
      this.getChats(res.id)
    })
  }

  getChats(id) {
    let post = {
      'userId': id
    }
    this.api.getChats(post).subscribe({
      next: (res => {
        this.myConversation = [];
        this.myConversation = res;

        this.arr = this.myConversation
          .flat()
          .sort((a, b) => {
            const dateComparison = a.date.localeCompare(b.date);
            if (dateComparison !== 0) {
              return dateComparison;
            }
            return a.time.localeCompare(b.time);
          });
      }),
      error: (err => {
        console.log(err);
      })
    })
  }

  netStatus(network) {
    return network?.status == 'online' ? true : false
  }
}
