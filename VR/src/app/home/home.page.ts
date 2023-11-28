import { Component } from '@angular/core';
import { Apiservice } from '../api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  login = false
  name: any
  mobile: any
  mail: any
  password: any

  constructor(public api: Apiservice) { }

  ionViewWillEnter() {

  }

  Register() {
    let post = {
      'name': this.name,
      'mail': this.mail,
      'password': this.password,
      'mobile': this.mobile,
    }

    console.log(post);

    this.api.Register(post).subscribe({
      next: (res => {
        console.log(res);
      }),
      error: (err => {
        console.log(err);
      })
    })

  }

}
