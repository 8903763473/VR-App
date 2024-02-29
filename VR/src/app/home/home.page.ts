import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PushNotificationService } from '../service/pushNotification.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router: Router, public pushNotify: PushNotificationService) {

  }

  chat(data) {
    this.router.navigate(['/' + data])
  }

  token() {
    this.pushNotify.getToken()
  }
}
