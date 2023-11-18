export class Pokemon {
  // par default all member of class in TS sont public

  // proprite
  id: number;
  hp: number;
  cp: number;
  name: string;
  picture: string;
  types: Array<string>;
  created: Date;

  constructor(
    _hp: number = 100,
    _cp: number = 10,
    _name: string = "nom",
    _picture: string = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/xxx.png",
    _types: Array<string> = ['Normal'],
    _created: Date = new Date()
  ) {
    this.hp = _hp;
    this.cp = _cp;
    this.name = _name;
    this.picture = _picture;
    this.types = _types;
    this.created = _created;
  }
}
