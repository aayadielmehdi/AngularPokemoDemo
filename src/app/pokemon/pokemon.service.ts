import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap } from "rxjs";
import { Pokemon } from "./pokemon";

@Injectable() //{
//providedIn: "root", // permet de fournir le service partout dans l'application
// faire l'injection que dans le module.
// on supprime cette ligne pour on fait l'injection au niveau du module dans l'option provider.
//}

// service // c'est pour des injection
// pour ne pas faire new class
// grouper l'ensemble des elements commun en un seul service.

// faire un service ou on stock donne
// tous les composants peuvent acceder e cette donne
// car c'est qu'un instance de ce pokemon service.
export class PokemonService {
  constructor(private httpClient: HttpClient) {}

  // voir app module . ts
  // utilisation de 
  // angular-in-memory-web-api
  // qui fait l'emulateur d'une web api.
  
  GetPokemonLIst(): Observable<Pokemon[]> {
    // returner un flux qui contiendra des pokemon (async)
    // return POKEMONS; // constant synchrone
    return this.httpClient.get<Pokemon[]>("api/pokemons").pipe(
      tap((response) => this.Log(response)), // => pour mettre trop d'instruction les mettres en {}
      catchError((error) => this.HandleError(error, []))
      // catchError((error) => {
      //   console.log(error);
      //   return of([]); // return un observable de tableau vide. // creer un flux (observable) qui emet un tableau vide.
      //   // pour ne pas mettre undefined et casse l'interface vaut mieux passer en parametre un tableau vide. (il affiche aucun pokemon)
      // })
    );
  }

  GetPokemonById(_id: number): Observable<Pokemon | undefined> {
    return this.httpClient.get<Pokemon>(`api/pokemons/${_id}`).pipe(
      tap((response) => this.Log(response)),
      catchError((error) => this.HandleError(error, undefined))
    );
  }

  UpdatePokemon(pokemon: Pokemon): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    return this.httpClient.put("api/pokemons", pokemon, httpOptions).pipe(
      tap((response) => this.Log(response)),
      catchError((error) => this.HandleError(error, null))
    );
  }

  AddPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    return this.httpClient.post<Pokemon>("api/pokemons", pokemon, httpOptions).pipe(
      tap((response) => this.Log(response)),
      catchError((error) => this.HandleError(error, null))
    );
  }

  SupprimerPokemonById(_idNumber: number): Observable<null> {
    return this.httpClient.delete(`api/pokemons/${_idNumber}`).pipe(
      tap((response) => this.Log(response)),
      catchError((error) => this.HandleError(error, null))
    );
  }

  RecherchePokemonList(term : string) : Observable<Pokemon[]>{
    // cette condition on peut la faire en front c'est meiux je pense que de consommer des ressources.
    if (term.length<2){
      return of([])
    }
    return this.httpClient.get<Pokemon[]> (`api/pokemons/?name=${term}`).pipe(
      tap((response)=> this.Log(response)),
      catchError((error)=> this.HandleError(error,[]))
    );
  }

  private Log(response: any) {
    console.table(response);
  }

  private HandleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
  GetPokemonTypeList(): string[] {
    return [
      "Plante",
      "Poison",
      "Feu",
      "Eau",
      "Insecte",
      "Normal",
      "Vol",
      "Electrik",
      "Fée",
      "Combat",
      "Psy",
    ];
  }
}
