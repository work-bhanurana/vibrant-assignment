import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserList } from '../model/user-list';
import { CommonService } from '../services/common-service.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  id: string;
  user: any;
  userNotFound: boolean = false
  constructor(private route: ActivatedRoute, private commonService: CommonService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.commonService.getUser(Number(this.id)).subscribe(resp => {
      if (resp && resp['data']) {
        this.user = resp['data'];
      }
    },
      (err: HttpErrorResponse) => {
        this.userNotFound = true
        this.commonService.notify('error', "User Not Found")
      })
  }

}
