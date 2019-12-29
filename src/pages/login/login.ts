import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import $ from 'jquery';

import { HomePage } from '../home/home';
import { environment as ENV } from '../../environments/environment';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage
{

  email_or_username: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  )
  {
  }

  ionViewDidLoad() {

  }

  doLogin()
  {
    var navCtrlCopy = this.navCtrl;

    $.ajax({
      method: "POST",
      url: ENV.api_url + "/sys/user/login",
      dataType: "json",
      data: {
        email_or_username: this.email_or_username,
        password: this.password
      },
      success: function(res){
        if(res.valid){
          localStorage.setItem('is_login', 'true');
          localStorage.setItem('jwt', res.jwt);

          localStorage.setItem('user_fullname', res.user.user_fullname);
          localStorage.setItem('user_email', res.user.user_email);

          navCtrlCopy.setRoot(HomePage);
        }else{
          window.alert(res.message);
        }
      }
    });
  }

}
