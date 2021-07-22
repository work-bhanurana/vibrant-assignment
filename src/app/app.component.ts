import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "./model/user";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "Vibrant-Assignment";
  user: User;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getuser();
    if (this.user != null && this.user.authenticated) {
      this.router.navigate(["/list-user"]);
    } else {
      this.router.navigate(["/login"]);
    }
  }
  logout() {
    this.authService.logout();
  }
}
