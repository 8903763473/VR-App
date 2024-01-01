import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apiservice } from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public router: Router, public api: Apiservice) {

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


  assignNetworkStatus(status) {
    let post = {
      'userId': localStorage.getItem('userId'),
      'status': status
    }
    this.api.NetworkStatus(post).subscribe({
      next: (res => {
        // console.log(res);
      }),
      error: (err => {
        console.log(err);
      })
    })
  }
}
