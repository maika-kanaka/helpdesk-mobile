import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DashboardPage } from '../dashboard/dashboard';
import { TicketsPage } from '../tickets/tickets';
import { ReportsPage } from '../reports/reports';
import { UsersPage } from '../users/users';

@Component({
  selector: 'page-main-tab',
  templateUrl: 'main-tab.html'
})
export class MainTabPage {

  dashboardRoot = DashboardPage;
  ticketsRoot = TicketsPage;
  reportsRoot = ReportsPage;
  usersRoot = UsersPage;

  public can_access_all: boolean = false;
  public can_access_users: boolean = true;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad()
  {
    if(localStorage.getItem('group_id') == '1' || localStorage.getItem('group_id') == '2'){
      this.can_access_all = true;
    }

    if(localStorage.getItem("group_id") == "3"){
      this.can_access_users = false;
    }
  }

}
