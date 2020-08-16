import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  App,
  ModalController,
  AlertController,
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";

import { LoginPage } from "../login/login";
import { ProfilEditPage } from "../profil-edit/profil-edit";

import { environment as ENV } from "../../environments/environment";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "page-dashboard",
  templateUrl: "dashboard.html",
})
export class DashboardPage {
  public profile: object = {
    user_id: "",
    user_name: "",
    user_fullname: "",
    user_email: "",
    user_photo: "",
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private app: App,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    this.getProfile();
  }

  getProfile() {
    this.http
      .get(ENV.api_url + "/sys/user/data", {
        responseType: "json",
        params: { user_id: localStorage.getItem("user_id") },
      })
      .subscribe((res) => {
        this.fillProfile(res);
      });
  }

  fillProfile(res) {
    if (res.status) {
      this.profile = res.users[0];
    }
  }

  modalProfilEdit() {
    const modal = this.modalCtrl.create(ProfilEditPage, {
      user_id: this.profile["user_id"],
    });

    modal.onDidDismiss((data) => {
      if (data.success_updated) {
        this.getProfile();
      }
    });

    modal.present();
  }

  logout() {
    const prompt = this.alertCtrl.create({
      title: this.translate.instant("master.confirmation"),
      message: this.translate.instant("master.are_you_sure_to_logout"),
      buttons: [
        {
          text: this.translate.instant("master.no"),
          handler: (data) => {
            console.log("Cancel clicked");
          },
        },
        {
          text: this.translate.instant("master.yes"),
          handler: (data) => {
            localStorage.clear();
            this.app.getRootNav().setRoot(LoginPage);
          },
        },
      ],
    });

    prompt.present();
  }
}
