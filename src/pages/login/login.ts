import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import $ from 'jquery';

import { MainTabPage } from '../main-tab/main-tab';
import { SignUpPage } from '../sign-up/sign-up';
import { environment as ENV } from '../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

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
    public navParams: NavParams,
    private translate: TranslateService
  )
  {
      if(localStorage.getItem('is_login') == 'true'){
        this.navCtrl.setRoot(MainTabPage);
      }
  }

  ionViewDidLoad() {

  }

  doLogin()
  {
    var navCtrlCopy = this.navCtrl;
    var that = this;

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
          if(res.user.group_id == '' || res.user.group_id == undefined){
            window.alert(that.translate.instant("login.user_is_new"));
          }
          else
          {
            localStorage.setItem('is_login', 'true');
            localStorage.setItem('jwt', res.jwt);

            localStorage.setItem('user_support', res.user_support);
            localStorage.setItem('user_fullname', res.user.user_fullname);
            localStorage.setItem('user_email', res.user.user_email);
            localStorage.setItem('user_id', res.user.user_id);

            navCtrlCopy.setRoot(MainTabPage);
          }
        }else{
          window.alert(res.message);
        }
      }
    });
  }

  pageSignUp()
  {
    this.navCtrl.push(SignUpPage);
  }

}
