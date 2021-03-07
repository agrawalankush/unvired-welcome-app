import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  users = [];
  errmsg: string;
  constructor(
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
  }
  logout() {
    this.authservice.removeTokenAndlogOut();
  }

}
