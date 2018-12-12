/**
 * copyright by Marszałkiewicz Konrad http://pixelhe.art/ 2018
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerRouterModule } from './bear.routing';
import { BeerListComponent } from './beer-list/beer-list.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';
import { BeerService } from './beer.service';
import { BeerListElementComponent } from './beer-list-element/beer-list-element.component';
import { HttpClientModule } from '@angular/common/http';
import {  MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    BeerListComponent,
    BeerDetailsComponent,
    BeerListElementComponent
  ],
  imports: [
    CommonModule,
    BeerRouterModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  providers: [
    BeerService
  ],
  entryComponents: [
    BeerDetailsComponent
  ]
})
export class BeerModule { }
