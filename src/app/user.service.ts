import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url1: string = "http://localhost:3000/users";

  constructor(private http: HttpClient) { }
  
  getUserList(): Observable<IUser[]>{
    return this.http.get<IUser[]>(this._url1);
  }
}
