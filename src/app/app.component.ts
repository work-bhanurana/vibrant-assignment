import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './model/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Vibrant-Assignment';
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    const user: User = this.authService.getuser()
    if (user != null && user.authenticated) {
      this.router.navigate(['/list-user']);
    } else {
      this.router.navigate(['/login']);
    }

  }
}

