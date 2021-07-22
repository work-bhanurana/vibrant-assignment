import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject, from } from 'rxjs';
import { map } from 'rxjs/operators'
import { User } from '../model/user';
import { Router } from '@angular/router';
import { CommonService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, private router: Router, private commonUtil: CommonService) {

  }
  login(user: User) {
    if (user.username === "User1" && user.password === "test1234") {
      user.authenticated = true;
      this.setUser(user);
      this.commonUtil.notify('success', 'Login Successfull !!!');
      this.router.navigateByUrl('list-user');
    } else {
      user.authenticated = false;
      this.commonUtil.notify('error', 'Login Failed !!!');
    }
    return user;

  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('User');
  }
  setUser(user: User) {
    localStorage.setItem('User', JSON.stringify(user));
  }
  getuser() {
    return JSON.parse(localStorage.getItem('User'));
  }



}
