import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { TicketsPage } from '../pages/tickets/tickets';
import { TicketAddPage } from '../pages/ticket-add/ticket-add';
import { TicketViewPage } from '../pages/ticket-view/ticket-view';
import { ReportsPage } from '../pages/reports/reports';
import { UsersPage } from '../pages/users/users';
import { UserEditPage } from '../pages/user-edit/user-edit';
import { MainTabPage } from '../pages/main-tab/main-tab';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignUpPage,
    DashboardPage,
    TicketsPage,
    TicketAddPage,
    TicketViewPage,
    ReportsPage,
    UsersPage,
    UserEditPage,
    MainTabPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignUpPage,
    DashboardPage,
    TicketsPage,
    TicketAddPage,
    TicketViewPage,
    ReportsPage,
    UsersPage,
    UserEditPage,
    MainTabPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
