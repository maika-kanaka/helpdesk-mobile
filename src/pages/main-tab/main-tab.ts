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

  dashboardRoot = DashboardPage
  ticketsRoot = TicketsPage
  reportsRoot = ReportsPage
  usersRoot = UsersPage

  constructor(public navCtrl: NavController) {}

}
