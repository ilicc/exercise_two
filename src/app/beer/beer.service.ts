/**
 * copyright by Marszałkiewicz Konrad http://pixelhe.art/ 2018
 */
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


const HOST: string = 'https://api.punkapi.com/v2/';

@Injectable()
export class BeerService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Download beer list
   * @param beerNumber Number of beers
   */
  getBeerList(beerNumber: number): Promise<any > {
    return new Promise((res, req) => {
      console.error({url: `${HOST}beers?page=${beerNumber}&per_page=20`});
      let url: string = `${HOST}beers?page=${beerNumber}&per_page=20`;
      this.http.get<any[]>(url).subscribe(
        (beerList: any) => {
          res(beerList);
        },
        (err) => {
          req(err);
        }
      );
    })
  }

  /**
   * Download single beer
   * @param beerId 
   */
  getBeer(beerId: number): Promise<any > {
    return new Promise((res, req) => {
      let url: string = `${HOST}beers/${beerId}`;
      this.http.get<any>(url).subscribe(
        (beer: any) => {
          res(beer);
        },
        (err) => {
          req(err);
        }
      );
    })
  }

  /**
   * Get list of similar beers
   * @param abv 
   */
  getSimilarBeer(abv: string): Promise<any> {
    return new Promise((res, req) => {
      let url: string = `${HOST}beers?${abv}`;
      console.log(url);
      this.http.get<any>(url).subscribe(
        (beer: any) => {
          res(beer);
        },
        (err) => {
          req(err);
        }
      );
    })
  }


}
