import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { environment as ENV } from "../../environments/environment";

@Component({
  selector: "page-reports",
  templateUrl: "reports.html",
})
export class ReportsPage {

  public date_from;
  public date_to;
  public category;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ReportsPage");
  }

  createReport() {
    window.open(ENV.api_url + "/rpt/ticket/create?date_from="+ this.date_from +"&date_to="+ this.date_to +"&category="+ this.category +"&jwt=" + localStorage.getItem("jwt"), '_blank');
    // window.open("https://google.com", "_blank");
  //   var request = {
  //     uri: "http://localhost/utavi/web/public" + "/rpt/ticket/create?jwt="+ localStorage.getItem("jwt"),
  //     title: "ReportHelpdesk",
  //     description: "",
  //     mimeType: "",
  //     visibleInDownloadsUi: false,
  //     notificationVisibility: 1,
  //     destinationInExternalFilesDir: {
  //       dirType: "Downloads",
  //       subPath: "mobile.apk",
  //     },
  //   };

  //   this.downloader
  //     .download(request)
  //     .then((location: string) => console.log("File downloaded at:" + location))
  //     .catch((error: any) => console.error(error));
  }
}
