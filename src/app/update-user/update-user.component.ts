import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserList } from '../model/user-list';
import { CommonService } from '../services/common-service.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;
  subscription: Subscription;
  userData: UserList;

  constructor(private formBuilder: FormBuilder, private commonService: CommonService, private route: Router) {

  }

  ngOnInit(): void {
    this.subscription = this.commonService.userData.subscribe(user => {
      console.log(user);
      if (user) {
        this.userData = user;
        this.userForm = this.formBuilder.group({
          first_name: [user.first_name, [Validators.required, Validators.minLength(4)]],
          last_name: [user.last_name, [Validators.required, Validators.minLength(4)]],
          email: [user.email, [Validators.required, Validators.email]],
        });
      } else {

      }
    });
  }

  get f() { return this.userForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.userForm
    console.log(this.userForm.value);
    let user = this.userForm.value;
    user.id = this.userData.id;
    this.commonService.UpdteUser(user).subscribe(resp => {
      console.log(resp);
      this.userForm.reset();
      this.commonService.notify('success', 'Update Successfully');
      this.route.navigateByUrl('list-user');
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


