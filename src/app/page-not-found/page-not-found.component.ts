import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class='center'>
      <img src="http://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png"/>
      <h1>Hey, cette page n'existe pas !</h1>

      <!-- on peut utiliser router link au lieu d'utiliser click a chaque
      mais de preference fonction au cote ts -->
      
      <a routerLink="/pokemons" class="waves-effect waves-teal btn-flat">    
        Retourner à l' accueil
      </a>
      
    </div>
  `,
  styles: [
  ]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
