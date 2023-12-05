import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() { }

  gateway() {
    var options = {
      key: "rzp_test_0KhtGhn3HU97Qx",
      key_secret: "Y2uvnVLT1HYZiuOjLMOtLYy5",
      amount: 100,
      currency: "INR",
      name: "FIRST_PROJECT",
      description: "For Testing Purpose",
      handler: function (response) {
        alert(response.razorpay_payment_id)
      },
      prefill: {
        name: "Vijay",
        email: "vijayakumar050301@gmail.com",
        contact: "1234567890"
      },
      notes: {
        address: "Razor Corporate Office"
      },
      theme: {
        color: "red"
      }
    };
    const rzp = new window['Razorpay'](options);
    rzp.open();
  }
}
