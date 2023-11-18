import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PokemonModule } from "./pokemon/pokemon.module";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./in-memory-data.service";
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    // clss de ce module (composant directive et pipe)
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
  ],
  exports: [], // sous ensemble de class de vue a exporter.
  imports: [
    // les classes exporter depuis un autre module
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),

    // faire attention au emplacement des importations
    // pokemonmodule contient des routes faut les declarer e premiere avant les routes en approutingmodule.
    PokemonModule,
    AppRoutingModule,
  ],
  providers: [], // permet de fournir un service au module (les injections par exemple)
  bootstrap: [AppComponent], // le componenet qui sera lancer au debut
})
export class AppModule {}
