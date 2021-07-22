import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable, BehaviorSubject } from 'rxjs';
import * as appConstant from '../helper/app-constant';
import { CreateUser } from '../model/create-user';
import { UserList } from '../model/user-list';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userData = new BehaviorSubject<any>({});

  constructor(private http: HttpClient, private notifier: NotifierService) { }

  // sendData(user: any) {
  //   this.userData.next(user);
  // }

  clearData() {
    this.userData.next({});
  }

  getUserList(pageno: number) {
    const url = `${appConstant.baseUrl}${appConstant.listUser}${pageno}`;
    return this.http.get(url);
  }

  createUser(user: CreateUser) {
    const url = `${appConstant.baseUrl}${appConstant.createUser}`;
    return this.http.post(url, user);
  }

  deleteUser(id: number) {
    const url = `${appConstant.baseUrl}${appConstant.deleteUser}${id}`;
    return this.http.delete(url);
  }
  UpdteUser(user: UserList) {
    const url = `${appConstant.baseUrl}${appConstant.updateUser}${user.id}`;
    return this.http.put(url, user);
  }
  getUser(id: number) {
    const url = `${appConstant.baseUrl}${appConstant.getUser}${id}`;
    return this.http.get(url);
  }
  notify(type: string, message: string) {
    this.notifier.notify(type, message);
  }

}
