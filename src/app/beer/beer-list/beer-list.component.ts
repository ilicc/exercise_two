/**
 * copyright by Marszałkiewicz Konrad http://pixelhe.art/ 2018
 */
import { Component, OnInit, HostListener } from "@angular/core";
import { BeerService } from "../beer.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { BeerDetailsComponent } from "../beer-details/beer-details.component";

@Component({
  selector: "app-beer-list",
  templateUrl: "./beer-list.component.html",
  styleUrls: ["./beer-list.component.css"]
})
export class BeerListComponent implements OnInit {
  beerList: any[] = []; // List of all downloaded beers
  filteredBeerList: any[] = []; // Filtered list of beers
  isDataLoaded: boolean = true; // Is beer list loaded
  beerNumber: number = 1; // How many bears we want to show, increasy with every download. Parameter for API
  isDataDownloaded: boolean = false; // Is all data from server downloaded

  constructor(
    private $beerService: BeerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.checkUrl();
  }

  ngOnInit() {
    this.loadBeerList(this.beerNumber);
  }

  /**
   * Get the beer list
   */
  loadBeerList(beerNumber: number): void {
    this.$beerService
      .getBeerList(beerNumber)
      .then(beerList => {
        if(beerList.length === 20){
          this.beerList = this.beerList.concat(beerList);
          this.filteredBeerList = this.beerList;
          this.isDataLoaded = true;
        } else {
          this.isDataDownloaded = true
          this.isDataLoaded = true;
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  /**
   * Listening for scroll events and reload beer list when condition is true
   */
  @HostListener("window:scroll", [])
  onWindowScroll(): void {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      this.isDataLoaded && !this.isDataDownloaded
    ) {
        this.beerNumber += 1;
        this.isDataLoaded = false;
        this.loadBeerList(this.beerNumber);
    }
  }

  /**
   * Opens dialog with details of beer
   * @param beer 
   */
  openBeerDetails(beer: any): void {
    this.router.navigate(['list', 'details', beer.id]);
    const dialogRef = this.dialog.open(BeerDetailsComponent, {
      data: {beer: beer}
    });
    dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['list']);
    })
  }

  /**
   * Check current URL. If somebody write URL manually then it will open modal with wanted beer
   */
  checkUrl(): void {
    if(this.activatedRoute.firstChild !== null){
      this.activatedRoute.firstChild.params.subscribe(params => {
        this.$beerService.getBeer(params['id'])
        .then(beer => {
          const dialogRef = this.dialog.open(BeerDetailsComponent, {
            data: {beer: beer[0]},
          });
          dialogRef.afterClosed().subscribe(result => {
            this.router.navigate(['list']);
          })
        })
        .catch(error => {
          console.error(error);
          this.router.navigate(['list']);
        });
      }
     );
    }
  }

  /**
   * Filter Beer List
   * @param condition Condition for switch
   * @param beerList List of all beers
   */
  filterBeerList(condition: string, beerList: any[]): void {
    switch(condition){
      case '6':
        this.filteredBeerList = beerList.filter(element => {
          return element.abv < 6;
        });
        break;
      case '6-13':
        this.filteredBeerList = beerList.filter(element => {
          return element.abv > 6 && element.abv < 13;
        });
        break;
      case '13':
        this.filteredBeerList = beerList.filter(element => {
          return element.abv > 13;
        });
        break;
      case 'all':
      default:
        this.filteredBeerList = beerList;
        break;
    }
  }

}
