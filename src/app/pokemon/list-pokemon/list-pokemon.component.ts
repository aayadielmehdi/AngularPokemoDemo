import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { POKEMONS } from "../mock-pokemon-list";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-list-pokemon",
  providers: [], // on peut aussi passe le service en composant dirrectement , mais a ne pas faire on perd la notion du singleton.
  templateUrl: "./list-pokemon.component.html",
  styles: [],
})
export class ListPokemonComponent implements OnInit {
  pokemonList: Pokemon[];
  pokemonSelected?: Pokemon; // similaire a pokemon | undefined
  // constructor(){
  //   this.pokemonList = [] //  a ne pas faire , si c'est le cas le faire en onInit.
  // }

  constructor(private router: Router, private pokService: PokemonService) {
    // const pokService = new PokemonService();
    // à ne jamais faire , car si pn modifie args du service faut faire la modification partout
    // on perd la notion de meme service.
  }

  ngOnInit() {
    // this.pokemonList = this.pokService.GetPokemonLIst()
    this.pokService
      .GetPokemonLIst()
      .subscribe((poksList) => (this.pokemonList = poksList));   // subsribe pour s'inscrire a une observable et recupere les element de celle ci
    // this.SelectPokemon(this.pokemonList[0])
  }

  SelectPokemon(_pokemon: Pokemon) {
    // console.log("vous avez cliqué sur le pokemon" +  pokemonName)  // ES5
    //console.log(`vous avez cliqué sur le pokemon ${_pokemon.name}`); // ES6 entre backquotes
  }

  // SelectPokemon_MouseEvent(event: MouseEvent) {
  //   // const index : number = Number((event.target as HTMLInputElement).value);
  //   const index: number = +(event.target as HTMLInputElement).value;  // + permet de convertir en number
  //   console.log(`vous avez cliqué sur le pokemon ${this.pokemonList[index].name}`)
  // }

  SelectPokemon_MouseEvent(id: number) {
    // this.pokemonSelected = this.pokemonList[index]
    // au lieu de chercher par index , je vais chercher maintenant avec id

    // pok de type pokemon ou undefined
    const pok: Pokemon | undefined = this.pokemonList.find((x) => x.id == id);

    if (pok) {
      console.log(`vous avez demande le pokemon ${pok.name}`);
      this.pokemonSelected = pok;
    } else {
      console.log(`Aucun pokemon trouvé`);
      this.pokemonSelected = pok;
    }
  }

  GoDetailPokemon(pokemon: Pokemon) {
    this.router.navigate(["/pokemon", pokemon.id]);
  }
}
