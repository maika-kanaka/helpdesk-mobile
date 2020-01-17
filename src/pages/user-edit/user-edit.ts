import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  ToastController
} from "ionic-angular";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";

import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import {
  environment as ENV,
  httpOptions
} from "../../environments/environment";

import $ from "jquery";
import { e } from "@angular/core/src/render3";

@IonicPage()
@Component({
  selector: "page-user-edit",
  templateUrl: "user-edit.html"
})
export class UserEditPage {
  userEditForm: FormGroup;
  submitted = false;
  is_block = false;

  public user: object = {
    user_id: "",
    user_name: "",
    user_fullname: "",
    user_email: "",
    user_photo: "",
    is_block: false
  };
  public user_password: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private http: HttpClient,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController
  ) {
    this.createForm();
  }

  ionViewWillEnter() {
    let user_id = this.navParams.get("user_id");

    this.http
      .get(ENV.api_url + "/sys/user/data", {
        responseType: "json",
        params: { user_id: user_id }
      })
      .subscribe(res => {
        this.fillForm(res);
      });
  }

  get f() {
    return this.userEditForm.controls;
  }

  fillForm(res) {
    if (res.status == true) {
      this.user = res.users[0];

      if(this.user.is_block == "N"){
        this.is_block = false;
      }else{
        this.is_block = true;
      }
    }
  }

  createForm() {
    this.userEditForm = this.formBuilder.group({
      fullname: ["", Validators.required],
      username: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(12)]
      ],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.minLength(5)]],
      group_id: ["", Validators.required],
      description: ["", [Validators.maxLength(255)]],
      is_block: [""]
    });
  }

  updateUser() {
    let objDataSend = this.userEditForm.value;
    objDataSend.user_id = this.navParams.get("user_id");
    objDataSend.jwt = localStorage.getItem("jwt");

    var that = this;

    $.ajax({
      method: "POST",
      url: ENV.api_url + "/sys/user/update",
      data: objDataSend,
      success: function(result) {
        if (result.status) {
          that.toastMsgUpdatedSuccess();
        }
      },
      error: function(error) {
        console.error(error);
      }
    });
  }

  toastMsgUpdatedSuccess() {
    const toast = this.toastCtrl.create({
      message: this.translate.instant("user.success_updated"),
      duration: 1000,
      position: 'bottom'
    });

    toast.present();

    let that = this;
    setTimeout(function() {
      that.closeModal();
    }, 1200);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
