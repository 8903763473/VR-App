import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apiservice } from './api/api.service';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(public router: Router, public api: Apiservice, private socketService: SocketService) {

    setInterval(() => {
      var page = router.url.split('/')[1]
      var status = sessionStorage.getItem('user')
      if (page == 'chat' && status == 'online') {
        this.assignNetworkStatus('online');
      } else {
        this.assignNetworkStatus('offline');
      }
    }, 1000)

  }

  ngOnInit() {
    this.socketService.Listen('test event').subscribe((data) => {
      console.log('Web Socket ', data);
    });
  }


  assignNetworkStatus(status) {
    // let post = {
    //   'userId': localStorage.getItem('userId'),
    //   'status': status
    // }
    // this.api.NetworkStatus(post).subscribe({
    //   next: (res => {
    //   }),
    //   error: (err => {
    //     console.log(err);
    //   })
    // })
  }
}
