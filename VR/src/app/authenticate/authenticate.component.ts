import { Component, OnInit, ViewChild } from '@angular/core';
import { Apiservice } from '../api/api.service';
import { Router } from '@angular/router';
import Swal, { SweetAlertPosition } from 'sweetalert2'
import { NgOtpInputComponent } from 'ng-otp-input';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss'],
})
export class AuthenticateComponent {

  login = false
  name: any
  mobile: any
  mail: any
  password: any
  LogMail: any
  LogPassword: any
  Newpassword: any
  ForgetMail: any
  Confirmpassword: any
  register: boolean = false
  Forgetpassword: boolean = false
  isActionSheetOpen: boolean = false
  otp: any[] = ['', '', '', '', '', ''];
  isButtonActive = false;
  AuthPage: any
  otpValue: any
  remainingTime: number = 90;
  timer: any;

  constructor(public api: Apiservice, public router: Router) { }

  otpConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '40px',
      height: '40px',
      color: '#FF0000'
    },
  };

  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput:
    | NgOtpInputComponent
    | any;

  ionViewWillEnter() {
    const isLogged = localStorage.getItem('Login');
    console.log(isLogged);

    if (isLogged == 'true') {
      this.router.navigate(['/home'])
    }
    this.register = false
    this.AuthPage = 1
  }

  pageRoute(id) {
    this.AuthPage = id
    // if (id == 3 || id == 2) {
    this.LogMail = undefined;
    this.LogPassword = undefined;
    // } else if (id == 1 || id == 2) {
    this.name = undefined
    this.mail = undefined
    this.password = undefined
    this.mobile = undefined
    // }
  }

  Register() {
    if (this.name != undefined && this.mail != undefined && this.password != undefined && this.mobile != undefined) {
      let post = {
        'name': this.name,
        'mail': this.mail,
        'password': this.password,
        'mobile': this.mobile,
      }

      console.log(post);

      this.api.Register(post).subscribe({
        next: (res => {
          console.log('REG', res);
          this.register = false
          this.toast('success', 'Registered Successfully');
          setTimeout(() => {
            this.AuthPage = 1
          }, 2000)
        }),
        error: (err => {
          console.log(err);
          this.toast('error', err.error.error);
        })
      })
    }
    else {
      this.toast('error', 'Fill the Fields to Register');
    }
  }

  Login() {
    if (this.LogMail != undefined && this.LogPassword != undefined) {
      let post = {
        'mail': this.LogMail,
        'password': this.LogPassword,
      }
      this.api.Login(post).subscribe({
        next: ((res: any) => {
          console.log('res', res);
          localStorage.setItem('userId', res[0]?.userId)
          localStorage.setItem('mail', res[0]?.mail)
          localStorage.setItem('mobile', res[0]?.mobile)
          localStorage.setItem('name', res[0]?.name)
          localStorage.setItem('token', res[0]?.token)
          localStorage.setItem('Login', 'true')
          this.toast('success', 'Login successfull');
          setTimeout(() => {
            this.router.navigate(['/home'])
            this.LogMail = undefined;
            this.LogPassword = undefined;
          }, 2000)
        }),
        error: (err => {
          console.log(err.error.error);
          this.toast('error', err.error.error);
        })
      })
    } else {
      this.toast('error', 'Fill the Fields to Login');
    }
  }

  SetPassword() {
    if (this.Newpassword != undefined && this.Confirmpassword != undefined && this.ForgetMail != undefined) {
      if (this.Newpassword == this.Confirmpassword) {
        let post = {
          "mail": this.ForgetMail,
          "newPassword": this.Newpassword,
          "confirmPassword": this.Confirmpassword
        }
        console.log(post);
        this.api.getOTP(post).subscribe({
          next: (res => {
            console.log(res);
            this.AuthPage = 4
            this.Newpassword = undefined;
            this.Confirmpassword = undefined;
            this.startTimer()
          }),
          error: (err => {
            console.log(err);
            this.toast('error', err.error.error);
          })
        })
      } else {
        this.toast('error', "Passwords doesn't match !");
      }
    } else {
      this.toast('error', 'Fill the Fields to get OTP');
    }
  }

  verify() {
    if (this.otpValue.length == 6) {
      let post = {
        'mail': this.ForgetMail,
        'otp': this.otpValue,
      }
      console.log(post);
      this.api.verifyOTP(post).subscribe({
        next: (res => {
          console.log(res);
          this.toast('success', 'Password changed successfully');
          setTimeout(() => {
            this.otpValue = undefined
            this.ionViewWillEnter();
          }, 2000)
          clearInterval(this.timer);
        }),
        error: (err => {
          console.log(err);
          this.toast('error', err.error.error);
        })
      })
    } else {
      this.toast('error', 'Fill the Fields to Reset');
    }
  }

  onOtpChange(event) {
    console.log('OTP Change:', event);
    this.otpValue = event
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        clearInterval(this.timer);
        console.log('Time expired. Handle accordingly.');
        this.toast('error', 'Time expired Try again');
        setTimeout(() => {
          this.ionViewWillEnter();
        }, 2000)
      }
    }, 1000);
  }

  toast(typeIcon: any, error: any, timerProgressBar: boolean = false) {
    Swal.fire({
      toast: true,
      position: 'top' as SweetAlertPosition,
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 3000,
      title: error
    })
  }

}
