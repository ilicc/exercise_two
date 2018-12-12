/**
 * copyright by Marszałkiewicz Konrad http://pixelhe.art/ 2018
 */
import { RouterModule, Routes } from "@angular/router";

const routesConfig: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full" },
  { path: "**", redirectTo: "list", pathMatch: "full" }
];

export const AppRoutingModule = RouterModule.forRoot(routesConfig, {});
