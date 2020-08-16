import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TicketEditPage } from './ticket-edit';

@NgModule({
  declarations: [
    TicketEditPage,
  ],
  imports: [
    IonicPageModule.forChild(TicketEditPage),
  ],
})
export class TicketEditPageModule {}
