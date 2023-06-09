import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  
  public us: any;
  Today = new Date();

  constructor(private _localstorageservice : LocalStorageService) { }

  ngOnInit(): void {
    this.us  = this._localstorageservice.retrieve('users')
  }

}
