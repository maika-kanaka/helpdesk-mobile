import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Downloader, DownloadRequest } from '@ionic-native/downloader/ngx';

import { TimelineComponent } from '../components/timeline/timeline';
import { TimelineTimeComponent } from '../components/timeline/timeline';
import { TimelineItemComponent } from '../components/timeline/timeline';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ProfilEditPage } from '../pages/profil-edit/profil-edit';
import { TicketsPage } from '../pages/tickets/tickets';
import { TicketAddPage } from '../pages/ticket-add/ticket-add';
import { TicketEditPage } from '../pages/ticket-edit/ticket-edit';
import { TicketViewPage } from '../pages/ticket-view/ticket-view';
import { TicketTrackStatusPage } from '../pages/ticket-track-status/ticket-track-status';
import { ReportsPage } from '../pages/reports/reports';
import { UsersPage } from '../pages/users/users';
import { UserEditPage } from '../pages/user-edit/user-edit';
import { MainTabPage } from '../pages/main-tab/main-tab';

@NgModule({
  declarations: [
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,

    MyApp,
    LoginPage,
    SignUpPage,
    DashboardPage,
    ProfilEditPage,
    TicketsPage,
    TicketAddPage,
    TicketEditPage,
    TicketViewPage,
    TicketTrackStatusPage,
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
    ProfilEditPage,
    TicketsPage,
    TicketAddPage,
    TicketEditPage,
    TicketViewPage,
    TicketTrackStatusPage,
    ReportsPage,
    UsersPage,
    UserEditPage,
    MainTabPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Downloader,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
