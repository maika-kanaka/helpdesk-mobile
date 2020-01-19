import { Component, ElementRef } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  LoadingController
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { environment as ENV } from "../../environments/environment";

import $ from 'jquery';
import { TranslateService } from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: "page-ticket-add",
  templateUrl: "ticket-add.html"
})
export class TicketAddPage {
  public categories: any;
  public ticketAddForm: FormGroup;
  public priority: boolean = false;
  public photoPreview: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private http: HttpClient,

    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    public loadingCtrl: LoadingController,
    private translate: TranslateService
  ) {
    this.createForm();
  }

  get f() {
    return this.ticketAddForm.controls;
  }

  createForm() {
    this.ticketAddForm = this.formBuilder.group({
      category: ["", Validators.required],
      title: ["", Validators.required],
      priority: [""],
      description: ["", Validators.required],
      photo: [""]
    });
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

  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.photoPreview = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  closeModal() {
    this.viewCtrl.dismiss({success_added: true});
  }

  saveTicket()
  {
    const loader = this.loadingCtrl.create({
      content: this.translate.instant("master.please_wait"),
      duration: 3000
    });

    loader.present();

    var objForm = this.ticketAddForm.value;
    var formData = new FormData();

    $.each(objForm, function(k, v){
      formData.append(k, v);
    });

    if(this.photoPreview != undefined){
      formData.append('photo-file', this.photoPreview);
    }
    formData.append('jwt', localStorage.getItem("jwt"));

    var that = this;

    $.ajax({
      method: "POST",
      url: ENV.api_url + "/trx/ticket/save",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function(result)
      {
        if (result.status) {

        }

        loader.dismiss();
        that.closeModal();
      },
      error: function(error)
      {
        console.error(error);
        loader.dismiss();
      }
    });
  }

}
