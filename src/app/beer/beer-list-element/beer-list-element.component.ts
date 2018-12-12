/**
 * copyright by Marszałkiewicz Konrad http://pixelhe.art/ 2018
 */
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-beer-list-element',
  templateUrl: './beer-list-element.component.html',
  styleUrls: ['./beer-list-element.component.css']
})
export class BeerListElementComponent implements OnInit {
  @Input() beer: any; // Single beer
  @Input() showTagline: string; // Should component show beer tag line in view template

  constructor() { }

  ngOnInit() {
  }

}
