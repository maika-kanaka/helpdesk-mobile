import { Component } from "@angular/core";
import { ModalController, NavController, NavParams, ActionSheetController, Modal } from "ionic-angular";

import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { environment as ENV } from "../../environments/environment";

import { UserEditPage } from '../user-edit/user-edit';

@Component({
  selector: "page-users",
  templateUrl: "users.html"
})
export class UsersPage {
  users: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private actionSheetCtrl: ActionSheetController,
    private translate: TranslateService,
    private modalCtrl: ModalController
  ) {}

  ionViewWillEnter() {
    this.getUsers();
  }

  presentAction(usid, usname) {
    const actionSheet = this.actionSheetCtrl.create({
      title: "Modify user: " + usname,
      buttons: [
        {
          text: this.translate.instant("master.edit"),
          icon: 'md-create',
          handler: () => {
            this.modalEditUser(usid);
          }
        }
      ]
    });
    actionSheet.present();
  }

  modalEditUser(usid) {
    const modal = this.modalCtrl.create(UserEditPage, {user_id: usid});

    modal.onDidDismiss((data) => {
      if(data.success_updated){
        this.getUsers();
      }
    });

    modal.present();
  }

  getUsers() {
    this.http
      .get(ENV.api_url + "/sys/user/data", { responseType: "json" })
      .subscribe((res) => {
        this.pushUser(res);
      });
  }

  pushUser(res){
    if(res.status == true){
      this.users = res.users;
    }
  }
}
