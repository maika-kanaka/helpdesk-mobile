import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { environment as ENV } from "../../environments/environment";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-ticket-edit',
  templateUrl: 'ticket-edit.html',
})
export class TicketEditPage
{

  public categories: any;
  public ticketEditForm: FormGroup;
  public ticket: any = {
    ticket_title: "",
    ticket_desc: "",
    ticket_photo: "",
    ticket_priority: "",
    ticket_status: "",
    category_id: 0,
    category_name: "",
    created_by: 0
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController,

    private formBuilder: FormBuilder,
    private translate: TranslateService
  ) {
    this.createForm();
  }

  createForm() {
    this.ticketEditForm = this.formBuilder.group({
      category: ["", Validators.required],
      title: ["", Validators.required],
      priority: [""],
      description: ["", Validators.required],
      photo: [""]
    });
  }

  ionViewWillEnter() {
    this.getTicket();
  }

  ionViewDidEnter() {
    this.http
      .get(ENV.api_url + "/master/categories", { responseType: "json" })
      .subscribe(res => {
        this.fillOptsCategory(res);
      });
  }

  fillOptsCategory(res) {
    if (res.status) {
      this.categories = res.categories;
    }
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

  pushTicket(res) {
    if (res.status) {
      this.ticket = res.tickets[0];
    }
  }

  updateTicket()
  {
    const loader = this.loadingCtrl.create({
      content: this.translate.instant("master.please_wait"),
      duration: 3000
    });

    loader.present();

    loader.dismiss();
    this.closeModal();
  }

  closeModal() {
    this.viewCtrl.dismiss({success_updated: true});
  }

}
