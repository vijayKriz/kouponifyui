import { Component, View } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { AuthHttp } from 'angular2-jwt';
import { Router } from 'angular2/router';

let styles = require('./home.css');
let template = require('./home.html');

@Component({
  selector: 'home',
    template: template
})

export class Home {
  coupons = [];
  jwt: string;
  response: string;
  api: string;

  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('jwt');
    this.callCouponListApi();
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.parent.navigateByUrl('/login');
  }

  createCoupon() {
    this.router.parent.navigateByUrl('/coupon');
  }

  callCouponListApi() {
    this.response = null;
    var headers = new Headers();
    headers.append('Authorization', 'Basic '+ this.jwt);
      this.http.get('http://localhost:8080/kouponify/coupons', {headers: headers})
        .subscribe(
          response => this.coupons = response.json().List,
          error => this.response = error.text()
        );
  }
}
