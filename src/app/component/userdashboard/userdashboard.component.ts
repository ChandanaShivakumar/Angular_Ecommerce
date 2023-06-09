import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {  

  public us: any;

  constructor(private router : Router, private route : ActivatedRoute, private _localstorageservice : LocalStorageService) { }

  ngOnInit(): void {
    this.us  = this._localstorageservice.retrieve('users')
  }

  showProfile(){
    this.router.navigate(['profile'], {relativeTo : this.route})
  }

  changePwd(){
    this.router.navigate(['changepwd'], {relativeTo : this.route})
  }

}
