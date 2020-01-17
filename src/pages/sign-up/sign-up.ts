import { Component, NgZone } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";

import { environment as ENV } from "../../environments/environment";
import { LoginPage } from "../login/login";

import $ from "jquery";

@IonicPage()
@Component({
  selector: "page-sign-up",
  templateUrl: "sign-up.html"
})
export class SignUpPage {
  signUpForm: FormGroup;
  submitted = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController
  ) {
    this.createForm();
  }

  createForm() {
    this.signUpForm = this.formBuilder.group(
      {
        fullname: ["", Validators.required],
        username: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(12)
          ]
        ],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(5)]],
        confirm_password: [""]
      },
      { validator: this.validPasswords }
    );
  }

  validPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirm_password.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  get f() {
    return this.signUpForm.controls;
  }

  submitSignUp() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    let that = this;

    $.ajax({
      method: "POST",
      url: ENV.api_url + "/sys/user/registration",
      data: {
        fullname: this.signUpForm.get("fullname").value,
        username: this.signUpForm.get("username").value,
        email: this.signUpForm.get("email").value,
        password: this.signUpForm.get("password").value
      },
      success: function(result) {
        if (result.status === false) {
          window.alert(result.message);
        } else {
          that.toastMsgSuccess();
        }
      },
      error: function(error) {
        console.error(error);
      }
    });
  }

  toastMsgSuccess() {
    const toast = this.toastCtrl.create({
      message: this.translate.instant("user.registration_success"),
      duration: 1000,
      position: "bottom"
    });

    toast.present();

    let that = this;

    setTimeout(function() {
      that.navCtrl.setRoot(LoginPage);
    }, 1200);
  }
}
