import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, of as observableOf } from 'rxjs';
import { UsersService } from './users.service';
import { BehaviorSubject } from 'rxjs';
import {
  catchError,
  finalize
} from 'rxjs/operators';

export class UsersDataSource extends DataSource<any> {
  private userdataSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public usersdatalength;
  public data = [];
  public pageindexuser;
  constructor(private userservice: UsersService) {
    super();
  }
  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.userdataSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.userdataSubject.complete();
    this.loadingSubject.complete();
  }
  loaduserdata(pageIndex: number, pageSize: number) {
    this.loadingSubject.next(true);
    this.userservice
      .getallusers(pageIndex, pageSize)
      .pipe(
        catchError(() => observableOf([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((userdata: any) => {
        // console.log(typeof userdata)
        this.usersdatalength = userdata.total;
        this.data = userdata;
        // stream values for user data table
        this.userdataSubject.next(userdata.users);
      });
  }
}


