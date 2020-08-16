import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TicketTrackStatusPage } from './ticket-track-status';

@NgModule({
  declarations: [
    TicketTrackStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(TicketTrackStatusPage),
  ],
})
export class TicketTrackStatusPageModule {}
