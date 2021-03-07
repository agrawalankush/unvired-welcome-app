import { Component, OnInit } from '@angular/core';
import { AuditService } from './audit.service';
import { MatSnackBarComponent } from '../shared/components/mat-snack-bar/mat-snack-bar.component';
@Component({
  selector: 'app-audits',
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.css']
})
export class AuditsComponent implements OnInit {
  audits = [];
  errmsg: string;
  constructor(private auditservice: AuditService, private snackBar: MatSnackBarComponent) { }

  ngOnInit(): void {
   this.getaudits();
  }
  getaudits() {
    this.auditservice.getallaudits()
           .subscribe(
          (res: any) => {
            this.audits = res;
          },
          (error) => {
            console.log(error);
            this.errmsg = error;
          }
        );
  }
  deleteaudit(id: number) {
    this.auditservice.deleteaudit(id)
           .subscribe(
          (res: any) => {
            if (res.success) {
              // console.log(res.msg);
              this.snackBar.openSnackBar(`${res.msg}`, '', 'green-snackbar');
              this.getaudits();
            }
          },
          (error) => {
            console.log(error);
            this.errmsg = error;
          }
        );
  }
}
