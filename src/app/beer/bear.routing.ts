/**
 * copyright by Marszałkiewicz Konrad http://pixelhe.art/ 2018
 */
import { RouterModule, Routes } from '@angular/router';
import { BeerListComponent } from './beer-list/beer-list.component';

const routesConfig: Routes = [
    {
        path: 'list', component: BeerListComponent,
        children: [
            { path: 'details/:id',  component: BeerListComponent },
            { path: '**',  redirectTo: 'list' },
        ]
    }
  ];

  export const BeerRouterModule = RouterModule.forChild(routesConfig);