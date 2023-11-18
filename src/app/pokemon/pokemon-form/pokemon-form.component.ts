import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-pokemon-form",
  templateUrl: "./pokemon-form.component.html",
  styleUrls: ["./pokemon-form.component.css"],
  styles: [],
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon;
  pokemonTypeList: string[];
  isAddForm : boolean;

  constructor(private pokService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    //pokemontypeliste
    this.pokemonTypeList = this.pokService.GetPokemonTypeList();

    // on doit rouver une facon pour distingue entre ajout ou modification
    this.isAddForm = this.router.url.includes("add");
  }

  hasType(type: string): boolean {
    return this.pokemon.types.includes(type);
  }

  selectType($event: Event, type: string) {
    if (($event.target as HTMLInputElement).checked) {
      this.pokemon.types.push(type);
    } else {
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }
  isTypesValid(type: string): boolean {
    if (this.pokemon.types.length == 1 && this.hasType(type)) {
      // si le type pokemon a un seul type faut pas decoche
      return false;
    } else if (this.pokemon.types.length > 2 && !this.hasType(type)) {
      // si a trois type on n'ajout pas d'autre. mais il peut desactiver les coches
      return false;
    }
    return true;
  }

  onSubmit() {
    if(!this.isAddForm) {
      this.pokService
        .UpdatePokemon(this.pokemon)
        .subscribe(() => this.router.navigate(["pokemon", this.pokemon.id])); //,(error)=> ...
    }else{
      this.pokService
        .AddPokemon(this.pokemon)
        .subscribe((p) => this.router.navigate(["pokemon", p.id])); // p.id c vient du server.
    }
  }
}