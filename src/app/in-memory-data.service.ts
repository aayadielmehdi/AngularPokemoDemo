import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";
import { POKEMONS } from "./pokemon/mock-pokemon-list";
@Injectable({
  providedIn: "root",
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // il faut passe par const 
    const pokemons = POKEMONS
    // si non on obtient rien
    return { pokemons };
  }
}
