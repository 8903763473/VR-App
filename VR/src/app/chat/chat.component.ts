import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Apiservice } from '../api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements AfterViewChecked {

  chatVisible = false;
  profileVisible = false;
  darkMode = false;
  openChat = false
  allUsers: any = []
  myConversation: any = []
  ourConversation: any = []
  AllChat: any = []
  clicked: any;
  myId: any;
  selectedChat: any;
  screenWidth: any;
  search: any;
  sentMsg: any;
  private userScrolledUp = false;


  @ViewChild('scrollContainer') scrollContainer: ElementRef | any;

  constructor(public api: Apiservice, public router: Router) {
    setInterval(() => {
      this.screenWidth = window.innerWidth
    }, 500)
  }

  ionViewWillEnter() {
    this.myId = localStorage.getItem('userId');
    sessionStorage.setItem('user', 'online')
    this.getUsers();
  }

  getUsers() {
    this.api.getAllUsers().subscribe({
      next: (res => {
        this.allUsers = res;
        this.allUsers = this.allUsers.filter(res1 => {
          return this.myId !== res1.userId
        })
        console.log(this.allUsers);         
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
        console.log(this.allUsers.length);
        this.selectedChat = this.allUsers[0];
        sessionStorage.setItem('SelectedChat', this.allUsers[0].id)
        // setInterval(() => {
        this.allChat(this.allUsers[0].userId, this.myId);
        // }, 2000)
      }),
      error: (err => {
        console.log(err);
      })
    })
  }

  SelectChat(data) {
    this.clicked = data.id
    this.selectedChat = data
    // this.ourConversation = [];
    this.openChat = true
    console.log(data);
    if (sessionStorage.getItem('SelectedChat') != data.id) {
      sessionStorage.setItem('SelectedChat', data.id)
      this.ourConversation = [];
      this.allChat(data.userId, this.myId)
    }
  }

  allChat(opponent, me) {
    this.AllChat = []
    this.AllChat.push({ 'id': opponent }, { 'id': me })
    this.AllChat.map(res => {
      this.getChats(res.id, opponent)
    })
  }

  getChats(id, receive) {
    let post = {
      'userId': id
    }
    console.log(this.ourConversation);
    console.log(id, receive);

    this.api.getChats(post).subscribe({
      next: (async res => {
        console.log(res);
        
        this.myConversation = [];
        this.myConversation = res;
        this.ourConversation = await this.ourConversation.concat(this.myConversation.flat());

        this.myConversation.map(async res2 => {
          if (res2.senderId == this.myId) {
            console.log('res2', res2, receive);
            if (res2.receiverId == receive) {
              console.log('res2', res2.receiverId, receive);

              this.ourConversation = await this.ourConversation.sort((a, b) => {
                const dateComparison = a.date.localeCompare(b.date);
                if (dateComparison !== 0) {
                  return dateComparison;
                }
                return a.time.localeCompare(b.time);
              });
              this.scrollToBottom();
              console.log(this.ourConversation);
            } else {
              this.ourConversation = []
            }
          }
        })
      }),
      error: (err => {
        console.log(err.error.error);
        console.log(this.ourConversation);
        this.ourConversation = [];
      })
    })
  }

  sentMessage(Message) {
    let post = {
      "userId": this.myId,
      "receiverId": this.selectedChat?.userId,
      "message": Message
    }

    this.api.sentMessage(post).subscribe({
      next: (res => {
        console.log(res);
        this.sentMsg = undefined
        // this.ourConversation = []
        this.getChats(this.myId, this.selectedChat.userId)
      }),
      error: (err => {
        this.sentMsg = undefined
      })
    })
  }

  onEnterKeyPressed(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.sentMessage(inputValue)
  }

  ngAfterViewChecked() {
    if (!this.userScrolledUp) {
      // this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    try {
      const container = this.scrollContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }


  onScroll(): void {
    // const container = this.scrollContainer.nativeElement;
    // this.userScrolledUp = container.scrollTop < (container.scrollHeight - container.clientHeight);
    // console.log('Scrolling');    
  }

  netStatus(network) {
    return network?.status == 'online' ? true : false
  }

}
