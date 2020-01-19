import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TicketViewPage } from './ticket-view';

@NgModule({
  declarations: [
    TicketViewPage,
  ],
  imports: [
    IonicPageModule.forChild(TicketViewPage),
  ],
})
export class TicketViewPageModule {}
