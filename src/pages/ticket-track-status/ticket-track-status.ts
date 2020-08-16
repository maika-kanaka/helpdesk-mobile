import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ViewController } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";

import * as moment from "moment";

import { environment as ENV } from "../../environments/environment";

@IonicPage()
@Component({
  selector: "page-ticket-track-status",
  templateUrl: "ticket-track-status.html"
})
export class TicketTrackStatusPage {
  public items = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private translate: TranslateService,
    private viewCtrl: ViewController
  ) {}

  ionViewDidEnter() {
    this.getTicket();
  }

  pushTrack(res) {
    if (res.status != true) {
      return;
    }

    let ticket = res.tickets[0];

    this.items.push({
      title: "Created by " + ticket.user_fullname,
      icon: "create",
      time: {
        subtitle: this.usingMomentJs(ticket.created_at).format(
          "MMM DD, YYYY hh:mm A"
        ),
        title: "Open"
      }
    });

    if (ticket.accepted_at != null) {
      this.items.push({
        title:
          this.translate.instant("master.accepted_by") +
          " " +
          ticket.user_acc_fullname,
        icon: "checkmark",
        time: {
          subtitle: this.usingMomentJs(ticket.accepted_at).format(
            "MMM DD, YYYY hh:mm A"
          ),
          title: "Accepted"
        }
      });
    }

    if (ticket.rejected_at != null) {
      this.items.push({
        title:
          this.translate.instant("master.rejected_by") + " " +
          ticket.user_reject_fullname +
          ". Notes: " +
          ticket.rejected_notes,
        icon: "close",
        time: {
          subtitle: this.usingMomentJs(ticket.rejected_at).format(
            "MMM DD, YYYY hh:mm A"
          ),
          title: "Rejected"
        }
      });
    }
  }

  getTicket() {
    this.http
      .get(ENV.api_url + "/trx/ticket/data", {
        responseType: "json",
        params: {
          ticket_id: this.navParams.get("ticket_id"),
          jwt: localStorage.getItem("jwt")
        }
      })
      .subscribe(res => {
        this.pushTrack(res);
      });
  }

  usingMomentJs(dt) {
    return moment(dt).utcOffset("+0700");
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
