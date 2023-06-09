import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private _url: string = "http://localhost:3000/invoice";

  constructor(private http: HttpClient) {}

  // getUserList(): Observable<IUser[]>{
  //   return this.http.get<IUser[]>(this._url1);
  // }

  postBill(data: any){
    return this.http.post(this._url, data);
  }
}
