import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogLoginComponent} from '../dialog-login/dialog-login.component';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  openDialogLogin() {
    const dialogRef = this.dialog.open(DialogLoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
