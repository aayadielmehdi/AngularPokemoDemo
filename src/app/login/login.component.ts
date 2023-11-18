import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit{
  message: string = "Vous êtes déconnecté. (elmehdi/aayadi)";
  name: string;
  password: string;
  auth : AuthService;

  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    this.auth = this.authService;
  }

  // Informe l'utilisateur sur son authentfication.
  setMessage() {
    this.message = this.authService.isLoggedIn
      ? "Vous êtes connecté."
      : "Identifiant ou mot de passe incorrect.";
  }

  // Connecte l'utilisateur auprès du Guard
  login() {
    this.message = "Tentative de connexion en cours ...";
    this.authService.login(this.name, this.password).subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        this.router.navigate(["/pokemons"]);
      } else {
        this.password = "";
        this.router.navigate(["/login"]);
      }
    });
  }

  // Déconnecte l'utilisateur
  logout() {
    this.authService.logOut();
    this.message = "Vous êtes déconnecté."
  }
}
