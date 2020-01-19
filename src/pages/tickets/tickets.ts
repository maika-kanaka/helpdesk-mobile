import { Component } from "@angular/core";
import { NavController, NavParams, ModalController, ToastController } from "ionic-angular";

import { TranslateService } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";

import { TicketAddPage } from "../ticket-add/ticket-add";
import { TicketViewPage } from "../ticket-view/ticket-view";
import { environment as ENV } from '../../environments/environment';

import * as moment from 'moment';

@Component({
  selector: "page-tickets",
  templateUrl: "tickets.html"
})
export class TicketsPage {
  public tickets: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private translate: TranslateService,
    private http: HttpClient
  ) {}

  ionViewDidEnter() {
    this.getTickets();
  }

  modalView(ticket_id) {
    const modal = this.modalCtrl.create(TicketViewPage, {ticket_id: ticket_id});

    modal.present();
  }

  modalAdd() {
    const modal = this.modalCtrl.create(TicketAddPage);

    modal.onDidDismiss((data) => {
      if(data.success_added){
        this.getTickets();
        this.toastMsgUpdatedSuccess();
      }
    });

    modal.present();
  }

  getTickets() {
    this.http.get(ENV.api_url + "/trx/ticket/data", {responseType: 'json', params: {'jwt': localStorage.getItem('jwt')}}).subscribe(res => {
      this.pushTickets(res);
    });
  }

  pushTickets(res)
  {
    if(res.status){
      this.tickets = res.tickets;
    }
  }

  toastMsgUpdatedSuccess() {
    const toast = this.toastCtrl.create({
      message: this.translate.instant("ticket.success_added"),
      duration: 1000,
      position: "bottom"
    });

    toast.present();
  }

  usingMomentJs(dt)
  {
    return moment(dt).utcOffset("+0700");
  }
}
