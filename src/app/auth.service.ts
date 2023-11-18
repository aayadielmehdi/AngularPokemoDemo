import { Injectable } from "@angular/core";
import { delay, Observable, of, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLoggedIn: boolean = false;
  constructor() {}
  login(name: string, password: string): Observable<boolean> {
    const isLoggedIn = name == "elmehdi" && password == "aayadi";
    return of(isLoggedIn).pipe(
      delay(1000),
      tap((val) => (this.isLoggedIn = val))
    );
  }
  logOut() {
    this.isLoggedIn = false;
  }
}
