import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { LoginPage } from '../login/login';

import { environment as ENV } from '../../environments/environment';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  public profile: object = {
    user_id: "",
    user_name: "",
    user_fullname: "",
    user_email: "",
    user_photo: ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private app: App) {
  }

  ionViewDidLoad() {
    this.http
    .get(ENV.api_url + "/sys/user/data", {
      responseType: "json",
      params: { user_id: localStorage.getItem("user_id") }
    })
    .subscribe(res => {
      this.fillProfile(res);
    });
  }

  fillProfile(res)
  {
    if(res.status){
      this.profile = res.users[0];
    }
  }

  logout()
  {
    localStorage.clear();
    this.app.getRootNav().setRoot(LoginPage);
  }

}
