import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TramitesPageRoutingModule } from './tramites-routing.module';

import { TramitesPage } from './tramites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TramitesPageRoutingModule
  ],
  declarations: [TramitesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TramitesPageModule {}
