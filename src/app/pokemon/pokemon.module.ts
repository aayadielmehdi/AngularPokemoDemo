import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BorderCardDirective } from "./border-card.directive";
import { ListPokemonComponent } from "./list-pokemon/list-pokemon.component";
import { DetailPokemonComponent } from "./detail-pokemon/detail-pokemon.component";
import { PokemonTypeColorPipe } from "./pokemon-type-color.pipe";
import { RouterModule, Routes } from "@angular/router";
import { PokemonService } from "./pokemon.service";
import { FormsModule } from "@angular/forms";
import { PokemonFormComponent } from "./pokemon-form/pokemon-form.component";
import { EditPokemonComponent } from "./edit-pokemon/edit-pokemon.component";
import { AddPokemonComponent } from "./add-pokemon/add-pokemon.component";
import { SeachPokemonComponent } from "./seach-pokemon/seach-pokemon.component";
import { LoaderComponent } from "./loader/loader.component";
import { AuthGuard } from "../auth.guard";

// les routes c'est du haut vers le bas
// mettre les routes du pokemons
// les routes les plus specifique en haut
const pokemonRoutes: Routes = [
  {
    path: "edit/pokemon/:id",
    component: EditPokemonComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "pokemon/add",
    component: AddPokemonComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "pokemons",
    component: ListPokemonComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "pokemon/:id",
    component: DetailPokemonComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    ListPokemonComponent,
    DetailPokemonComponent,
    BorderCardDirective,
    PokemonTypeColorPipe,
    PokemonFormComponent,
    EditPokemonComponent,
    AddPokemonComponent,
    SeachPokemonComponent,
    LoaderComponent,
  ],
  providers: [PokemonService], // se service est vu que par le module.
  imports: [CommonModule, FormsModule, RouterModule.forChild(pokemonRoutes)], // dans la sous module on mets forchild
})
export class PokemonModule {}
