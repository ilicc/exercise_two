/**
 * copyright by Marszałkiewicz Konrad http://pixelhe.art/ 2018
 */
import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { BeerService } from "../beer.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-beer-details",
  templateUrl: "./beer-details.component.html",
  styleUrls: ["./beer-details.component.css"]
})
export class BeerDetailsComponent implements OnInit {
  public beer: any; // Beer
  public similarBeerList: any[] = []; // Similar beer list
  isDataLoaded: boolean = false; // Is data downloaded

  constructor(
    private $beerService: BeerService,
    private location: Location,
    public dialogRef: MatDialogRef<BeerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.beer = data.beer;
    this.getSimilarBeer(data.beer.abv, this.similarBeerList);
  }

  ngOnInit() {}

  /**
   * Get similar beers
   * @param abv Beer abv
   * @param list Beer list
   * I didnt find API to get beers with similar IBU/ABV/EBC so I did it that way
   */
  getSimilarBeer(abv: number, list: any[]): void {
    this.$beerService
      .getSimilarBeer("abv_lt=" + Math.round(abv).toString())
      .then(result => {
        if (result.length < 3) {
          this.$beerService
            .getSimilarBeer("abv_gt=" + Math.round(abv).toString())
            .then(result => {
              for (let i = 0; i < 3; i++) {
                list.push(result[Math.floor(Math.random() * result.length)]);
              }
              this.isDataLoaded = true;
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          for (let i = 0; i < 3; i++) {
            list.push(result[Math.floor(Math.random() * result.length)]);
          }
          this.isDataLoaded = true;
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  /**
   * Changes data in modal window if we click on suggested beer
   * @param beer choosen suggested beer
   */
  goToSuggestedBeer(beer: any): void {
    this.beer = beer;
    this.isDataLoaded = false;
    this.similarBeerList = [];
    this.getSimilarBeer(beer.abv, this.similarBeerList);
    this.location.replaceState(`/list/details/${beer.id}`);
  }
}
