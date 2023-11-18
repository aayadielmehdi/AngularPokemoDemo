import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styles: [
  ]
})
export class AddPokemonComponent implements OnInit {

  constructor() { }
  pokemon : Pokemon
  ngOnInit(): void {
    this.pokemon =  new Pokemon()
  }

}
