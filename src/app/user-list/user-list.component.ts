import { HttpErrorResponse } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserList } from '../model/user-list';
import { CommonService } from '../services/common-service.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  data: any;
  numbers: number = 0;
  search: number;
  constructor(private commonUtil: CommonService, private router: Router, private modalService: NgbModal) {
    this.getUserList(1);
  }

  ngOnInit(): void {

  }
  getUserList(pageno: number) {
    this.commonUtil.getUserList(pageno).subscribe(resp => {
      if (resp && resp['data']) {
        this.numbers = resp['total_pages'];
        console.log(resp);
        this.data = resp;
      }
    })
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }

  next() {
    if (this.data.page < this.data.total_pages) {
      this.data.page++;
      this.getUserList(this.data.page);
    }
  }
  prev() {
    if (this.data.page > 1) {
      this.data.page--;
      this.getUserList(this.data.page);
    }
  }
  craeteUser() {
    this.router.navigateByUrl('create-user');
  }

  delete(user: UserList) {
    this.commonUtil.deleteUser(user.id).subscribe(resp => {
      console.log(resp)
      this.getUserList(1);
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      })
  }
  update(user: UserList) {
    this.commonUtil.userData.next(user);
    this.router.navigateByUrl('update-user');
  }

  open(content, user) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'confirm') {
        this.delete(user);
      } else if (result === 'cancel') {
        console.log('cancelled by user')
      }
      console.log(result);
    }, (reason) => {
      this.getDismissReason(reason, user);
    });
  }

  private getDismissReason(reason: any, user: UserList): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }
    else {
      return `with: ${reason}`;
    }
  }

  searchUser() {
    this.router.navigate(['users/', this.search]);
  }

}
