import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  LoadingController,
  AlertController,
  ModalController
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";

import { environment as ENV } from "../../environments/environment";

import $ from 'jquery';
import * as moment from 'moment';
import { TranslateService } from "@ngx-translate/core";

import { TicketEditPage } from "../ticket-edit/ticket-edit";
import {TicketTrackStatusPage} from  "../ticket-track-status/ticket-track-status";

@IonicPage()
@Component({
  selector: "page-ticket-view",
  templateUrl: "ticket-view.html"
})
export class TicketViewPage {
  public ticket: any = {
    ticket_title: "",
    ticket_desc: "",
    ticket_photo: "",
    ticket_priority: "",
    ticket_status: "",
    category_name: "",
    created_by: 0
  };

  public can_edit_cancel: boolean = false;
  public can_accept_reject: boolean = false;

  public ENV: any = ENV;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private viewCtrl: ViewController,
    private translate: TranslateService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}

  ionViewWillEnter() {
    this.getTicket();
  }

  getTicket()
  {
    this.http
    .get(ENV.api_url + "/trx/ticket/data", {
      responseType: "json",
      params: {
        ticket_id: this.navParams.get("ticket_id"),
        jwt: localStorage.getItem('jwt')
      }
    })
    .subscribe(res => {
      this.pushTicket(res);
    });
  }

  modalEdit(ticket_id)
  {
    const modal = this.modalCtrl.create(TicketEditPage, {ticket_id: ticket_id});

    modal.onDidDismiss((data) => {
      if(data.success_updated){
        this.getTicket();
      }
    });

    modal.present();
  }

  pushTicket(res) {
    if (res.status) {
      this.ticket = res.tickets[0];
    }

    // hak akses edit, delete
    if(localStorage.getItem('user_id') == this.ticket.created_by && this.ticket.ticket_status == 'open'){
      this.can_edit_cancel = true;
    }

    let can_access = JSON.parse(localStorage.getItem("can_access_menu"));
    if(can_access.indexOf("ticket_view_support") != -1 && this.ticket.ticket_status == 'open'){
      this.can_accept_reject = true;
    }
  }

  cancelTicket()
  {
    const confirm = this.alertCtrl.create({
      title: this.translate.instant('master.confirmation'),
      message: this.translate.instant('master.are_you_sure_to_cancel'),
      buttons: [
        {
          text: this.translate.instant('master.no'),
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: this.translate.instant('master.yes'),
          handler: () => {
            this.doCancelTicket();
          }
        }
      ]
    });

    confirm.present();
  }

  doCancelTicket()
  {
    const loader = this.loadingCtrl.create({
      content: this.translate.instant("master.please_wait"),
      duration: 3000
    });

    loader.present();

    var that = this;

    $.ajax({
      method: "POST",
      url: ENV.api_url + "/trx/ticket/status/change",
      data: {
        ticket_id: this.navParams.get("ticket_id"),
        status: 'canceled',
        jwt: localStorage.getItem('jwt')
      },
      success: function(result)
      {
        if (result.status) {

        }

        loader.dismiss();
        that.getTicket();
      },
      error: function(error)
      {
        console.error(error);
        loader.dismiss();
      }
    });
  }

  acceptTicket()
  {
    const confirm = this.alertCtrl.create({
      title: this.translate.instant('master.confirmation'),
      message: this.translate.instant('master.are_you_sure_to_accept'),
      buttons: [
        {
          text: this.translate.instant('master.no'),
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: this.translate.instant('master.yes'),
          handler: () => {
            this.doAcceptTicket();
          }
        }
      ]
    });

    confirm.present();
  }

  doAcceptTicket()
  {
    const loader = this.loadingCtrl.create({
      content: this.translate.instant("master.please_wait"),
      duration: 3000
    });

    loader.present();

    var that = this;

    $.ajax({
      method: "POST",
      url: ENV.api_url + "/trx/ticket/status/change",
      data: {
        ticket_id: this.navParams.get("ticket_id"),
        status: 'accept',
        jwt: localStorage.getItem('jwt')
      },
      success: function(result)
      {
        if (result.status) {

        }

        loader.dismiss();
        that.getTicket();
      },
      error: function(error)
      {
        console.error(error);
        loader.dismiss();
      }
    });
  }

  rejectTicket()
  {
    const prompt = this.alertCtrl.create({
      title: this.translate.instant('master.confirmation'),
      message: this.translate.instant("master.are_you_sure_to_reject"),
      inputs: [
        {
          name: 'reason',
          placeholder: this.translate.instant('master.please_explain_your_reason')
        },
      ],
      buttons: [
        {
          text: this.translate.instant('master.no'),
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.translate.instant('master.yes'),
          handler: data => {
            this.doRejectTicket(data);
          }
        }
      ]
    });

    prompt.present();
  }

  doRejectTicket(data)
  {
    const loader = this.loadingCtrl.create({
      content: this.translate.instant("master.please_wait"),
      duration: 3000
    });

    loader.present();

    var that = this;

    $.ajax({
      method: "POST",
      url: ENV.api_url + "/trx/ticket/status/change",
      data: {
        ticket_id: this.navParams.get("ticket_id"),
        status: 'reject',
        reason: data.reason,
        jwt: localStorage.getItem('jwt')
      },
      success: function(result)
      {
        if (result.status) {

        }

        loader.dismiss();
        that.getTicket();
      },
      error: function(error)
      {
        console.error(error);
        loader.dismiss();
      }
    });
  }







  modalTrackingStatus()
  {
    const modal = this.modalCtrl.create(TicketTrackStatusPage, {ticket_id: this.navParams.get("ticket_id")});

    modal.present();
  }

  closeModal() {
    this.viewCtrl.dismiss({ success_updated: true });
  }

  usingMomentJs(dt)
  {
    return moment(dt).utcOffset("+0700");
  }

}
