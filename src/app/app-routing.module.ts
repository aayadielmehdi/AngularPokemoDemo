import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { ListPokemonComponent } from "./pokemon/list-pokemon/list-pokemon.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { DetailPokemonComponent } from "./pokemon/detail-pokemon/detail-pokemon.component";
import { LoginComponent } from "./login/login.component";

// les routes c'est du haut vers le bas
const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    component: LoginComponent,
  },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // dans la racine on mets forroot
  exports: [RouterModule],
})
export class AppRoutingModule {}
