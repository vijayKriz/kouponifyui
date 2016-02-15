import { Component, View } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { AuthHttp } from 'angular2-jwt';
import { Router, RouterLink } from 'angular2/router';
import {NgForm}    from 'angular2/common';

let template = require('./coupon.html');


@Component({
  selector: 'coupon',
  template: template
})

export class CouponComponent {
  jwt: string;

  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('jwt');
  }

  model = new Coupon(12, new Date(), new Date() , 200, 10, 'percent');
  submitted = false;
  onSubmit() {
    this.submitted = true;
   }
  submitCoupon() {
    let body = JSON.stringify(this.model);
    var headers = new Headers();
    headers.append('Authorization', 'Basic '+ this.jwt);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:8080/kouponify/coupons', body, { headers: headers })
      .subscribe(
        response => {
          this.router.parent.navigateByUrl('/home');
        },
        error => {
          console.log(error.text());
        }
      );
  }
  get diagnostic() { return JSON.stringify(this.model); }
}


export class Coupon {
  constructor(
      public value: number,
      public startAt: Date,
      public endAt: Date,
      public minimumOrderAmount: number,
      public usageLimit: number,
      public discountType: string
  ) { }
}




