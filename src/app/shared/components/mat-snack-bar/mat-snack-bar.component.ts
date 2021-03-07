import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-mat-snack-bar',
  template: ``,
  styles: []
})
export class MatSnackBarComponent implements OnInit {

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  // this function will open up snackbar on top right position with custom background color (defined in css)
  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
     duration: 5000,
     verticalPosition: 'top',
     horizontalPosition: 'center',
     panelClass: [className],
   });
}
}
