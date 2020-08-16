import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilEditPage } from './profil-edit';

@NgModule({
  declarations: [
    ProfilEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilEditPage),
  ],
})
export class ProfilEditPageModule {}
