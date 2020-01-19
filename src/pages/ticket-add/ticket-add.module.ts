import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TicketAddPage } from './ticket-add';

@NgModule({
  declarations: [
    TicketAddPage,
  ],
  imports: [
    IonicPageModule.forChild(TicketAddPage),
  ],
})
export class TicketAddPageModule {}
