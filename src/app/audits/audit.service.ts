import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { UtilsService } from '../shared/services/utils.service';
@Injectable({
  providedIn: 'root'
})
export class AuditService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  private baseurl = '/api/audits';

  constructor(private http: HttpClient, private utilservice: UtilsService) { }
  getallaudits()
    {
      return this.http.get(`${this.baseurl}/all`, this.httpOptions).pipe(
        retry(1),
        catchError(this.utilservice.handleError)
      );
    }
  deleteaudit(id: number)
  {
      return this.http.delete(`${this.baseurl}/${ id }`).pipe(
        retry(1),
        catchError(this.utilservice.handleError)
      );
  }
}
