import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[pkmnBorderCard]", // on peut changer se nom
})

// on va creer notre propre directive.
// les directives sont des classes qui ajoutent un comportement supplementaire aux element du DOM

// les decorateurs permettent par simple annotation de modifier le compoertement d'une clasee, propriete ou un fonction
// il permet de factoriser certains patterns
// tout objet peut etre etendu par un comportement souhaite sans affecter le comportement des autres objets de la meme classe
export class BorderCardDirective {
  private initialColor: string = "#f5f5f5";
  private defaultColor: string = "#009688";
  private defaultHeight: number = 180;

  constructor(private el: ElementRef) {
    this.SetHeight(this.defaultHeight);
    this.SetBorder(this.initialColor);
  }

  //
  // pkmnBorderCard = "red" en balise; si on donne a l'alias meme nom que la directive,
  // else si on ecrit : @Input() bordercolor: string
  // la balise diot etre comme suivant pkmnBorderCard bordercolor="red"
  //
  @Input("pkmnBorderCard") bordercolor: string; // alias est bordercolor , mettre nom de la directive en () input

  @HostListener("mouseenter") onMouseEnter() {
    this.SetBorder(this.bordercolor || this.defaultColor); // si bordercolor est decrite si non on affecte defaultcolor.
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.SetBorder(this.initialColor);
  }

  SetHeight(_height: number) {
    this.el.nativeElement.style.height = `${_height}px`;
  }

  SetBorder(_color: string) {
    this.el.nativeElement.style.border = `solid 4px ${_color}`;
  }
}
