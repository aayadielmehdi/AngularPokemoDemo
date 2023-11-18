import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-detail-pokemon",
  templateUrl: "./detail-pokemon.component.html",
})
export class DetailPokemonComponent implements OnInit {
  private pokemonList: Pokemon[];
  pokemon?: Pokemon;

  // service pour recuperer router detail
  // private route: ActivatedRoute , private router : Router se sont des injections

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokService: PokemonService
  ) {
    // recuperer router dans le composant
  }

  ngOnInit(): void {
    const pokemonId: string | null = this.route.snapshot.paramMap.get("id");
    if (pokemonId) {
      // this.pokemon = this.pokService.GetPokemonById(+pokemonId);
      this.pokService
        .GetPokemonById(+pokemonId)
        .subscribe((pok) => (this.pokemon = pok));

        // on peut mettre dans le subscribe ((pok) => {
        // this.pokemon.... ; .... ;
        // })

        /*
        ou faire ((pok) => (this.pokemon.... , .... ))
        */
    }
    // else{
    //   this.pokemonSelected = undefined // ou ne rienn faire.
    // }
  }

  goBack() {
    return this.router.navigate(["/pokemons"]);
  }

  Edit(pokemon: Pokemon) {
    return this.router.navigate(["edit/pokemon/", pokemon.id]);
  }

  Delete(pokemon: Pokemon) {
    this.pokService
      .SupprimerPokemonById(pokemon.id)
      .subscribe(() => this.goBack());
  }
}
