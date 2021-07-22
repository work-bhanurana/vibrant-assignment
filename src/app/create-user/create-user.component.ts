import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common-service.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private commonService: CommonService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(4)]],
      last_name: ['', [Validators.required, Validators.minLength(4)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      pincode: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required]],
    });
  }

  get f() { return this.userForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid

    if (this.userForm.invalid) {
      return;
    }
    this.userForm
    console.log(this.userForm.value);
    this.commonService.createUser(this.userForm.value).subscribe(resp => {
      console.log(resp);
      this.commonService.notify('success', 'User Created Successfully');
      this.userForm.reset();
      this.submitted = false;
    })
    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }



}
