import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-edit-pokemon",
  templateUrl: "./edit-pokemon.component.html",
  styles: [],
})
export class EditPokemonComponent implements OnInit {
  pokemon?: Pokemon;

  // nameStable?: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokService: PokemonService
  ) {}

  ngOnInit(): void {
    const pokemonId: string | null = this.route.snapshot.paramMap.get("id");
    if (pokemonId) {
      // this.pokemon = this.pokService.GetPokemonById(+pokemonId);
      this.pokService
        .GetPokemonById(+pokemonId)
        .subscribe((pok) => (this.pokemon = pok));

      // passage par valeur
      // this.namestable = this.pokemon.name   // si on modifie name du pokemon c change pas namestable.
      // tableau array .... et autre c'est passage par reference
      //  this.pok = this.pokemon;
    }
  }
}
