import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { QRCodeComponent } from 'angularx-qrcode';

import { IdCardPageRoutingModule } from './id-card-routing.module';

import { IdCardPage } from './id-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeComponent,
    IdCardPageRoutingModule
  ],
  declarations: [IdCardPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IdCardPageModule {}
