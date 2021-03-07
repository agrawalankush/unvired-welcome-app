import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UsersService } from './users.service';
import { MatPaginator } from '@angular/material/paginator';
import { UsersDataSource } from './users-datasource';
import { MatTable } from '@angular/material/table';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  dataSource: UsersDataSource;
  displayedColumns = [
    'userid',
    'email',
    'role',
    'createddate'
  ];
  users = [];
  errmsg: string;
  constructor(
    private usersservice: UsersService
  ) { }

  ngOnInit(): void {
    this.dataSource = new UsersDataSource(this.usersservice);
    // console.log(this.dataSource);
    this.dataSource.loaduserdata(
      0,
      10
    );
  }
  ngAfterViewInit() {
      this.paginator.page.pipe(tap(() => this.loadUsersPage())).subscribe();
  }
  loadUsersPage() {
    this.dataSource.loaduserdata(
      this.paginator.pageIndex * this.paginator.pageSize,
      this.paginator.pageSize,
    );
  }
  // getallusers() {
  //   this.usersservice.getallusers()
  //       .subscribe(
  //         (res: any) => {
  //           this.users = res;
  //         },
  //         (error) => {
  //           console.log(error);
  //           this.errmsg = error;
  //         }
  //       );
  // }
}
