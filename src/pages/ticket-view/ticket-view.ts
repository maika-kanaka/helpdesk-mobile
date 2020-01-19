import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";

import { environment as ENV } from "../../environments/environment";

import * as moment from 'moment';

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
    private viewCtrl: ViewController
  ) {}

  ionViewWillEnter() {
    let ticket_id = this.navParams.get("ticket_id");

    this.http
      .get(ENV.api_url + "/trx/ticket/data", {
        responseType: "json",
        params: {
          ticket_id: ticket_id,
          jwt: localStorage.getItem('jwt')
        }
      })
      .subscribe(res => {
        this.pushTicket(res);
      });
  }

  pushTicket(res) {
    if (res.status) {
      this.ticket = res.tickets[0];
    }

    // hak akses edit, delete
    if(localStorage.getItem('user_id') == this.ticket.created_by){
      this.can_edit_cancel = true;
    }

    let can_access = JSON.parse(localStorage.getItem("can_access_menu"));
    if(can_access.indexOf("ticket_view_support") != -1){
      this.can_accept_reject = true;
    }
  }

  acceptTicket(ticket_id)
  {

  }

  rejectTicket(ticket_id)
  {

  }



  closeModal() {
    this.viewCtrl.dismiss({ success_updated: true });
  }

  usingMomentJs(dt)
  {
    return moment(dt).utcOffset("+0700");
  }

}
