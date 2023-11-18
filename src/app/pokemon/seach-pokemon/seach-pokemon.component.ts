import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  switchMap,
} from "rxjs";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-seach-pokemon",
  templateUrl: "./seach-pokemon.component.html",
  styles: [],
})
export class SeachPokemonComponent implements OnInit {
  searchTerm = new Subject<string>();
  // on stock les recherche en tableau de chaine de caractere {a aa ab aa ..... } // on peut le traiter
  // => flux qui donne polemonlist(a) .. polemonlist(aa) .. polemonlist(ab)

  pokemons$: Observable<Pokemon[]>; // un observable c'est plus d'un pokemon // on ne peut que le consommer
  // le dollar c'est pour dire que c'est un flux de donnee (notation seulement-on peut ne pas le mettre)

  constructor(private router: Router , private pokService : PokemonService) {}

  ngOnInit(): void {
    this.pokemons$ = this.searchTerm.pipe(
      // {a.aa..ab...aa..ab...aa.ac... } eliminer les recherches successive pour ne pas enbeter le server.
      // ça va donne apres cette fonction debounce
      // {ab...ab...ac}
      // eliminer les requete
      debounceTime(300),

      distinctUntilChanged(), // attendre les changements en recherche {ab...ac}

      switchMap((term) => this.pokService.RecherchePokemonList(term)) //map return observable => { observable<ab>...observable<ac>}
      // pokemonlist(ab) ... pokemonlist(ac)
      // switch map (change entre recherche de ab et recherche ac)

    );
  }

  Recherche(term: string) {
    this.searchTerm.next(term);
  }

  GoToDetailPokemon(pok: Pokemon) {
    this.router.navigate(["/pokemon", pok.id]);
  }
}
