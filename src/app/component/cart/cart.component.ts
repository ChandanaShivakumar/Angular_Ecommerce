import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularToastService } from 'angular-toasts';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from 'src/app/auth.service';
import { CartService } from 'src/app/cart.service';
import { decrement, increment } from 'src/app/counter/state/counter.actions';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillService } from 'src/app/bill.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  counter: number;
  public al: string ="payment successful"
  public us: any;
  public usname: string = "";
  public usemail: string = "";
  public products: any = [];
  public grandtot: number = 0;
  public totitem: number=0;
  Today = new Date();
  
  @ViewChild('uname')nameofuser: ElementRef;

  constructor(private _cartservice : CartService, private auth: AuthService, private _localstorageservice: LocalStorageService, private store: Store<{counter:{counter: number}}>, private _toast: AngularToastService, private _loc: Location,private fb: FormBuilder,
    private _billservice: BillService) {
     
    }


    ngOnInit(): void {

      this.us  = this._localstorageservice.retrieve('users');
      this.billForm.patchValue({
        name: this.us.name,
        email: this.us.email,
      });
    this._cartservice.getProducts()
    .subscribe( res =>{
      this.products = res;
      this.grandtot = this._cartservice.getTotalPrice();
      this.totitem = res.length;
      
    })

    // this.store.select('counter').subscribe((data)=>{
    //   this.counter = data.counter;
    // });
  }
  

//   options = {
//     "key": "rzp_test_7HdkaZ1xFGPomB",
//     "amount": 0,
//     "name": "Infinito Pay",
//     "description": "Test Transaction",
//     "order_id": "", 
//     "prefill": {
//         "name": this.usname,
//         "email": this.usemail
//     },
//     "notes": {
//         "address": "Razorpay Corporate Office"
//     },
//     "theme": {
//         "color": "#000"
//     }
// };

// rzp1: any;
// pay(){
//   this.options.amount = this.grandtot * this.counter * 100;
//   this.rzp1 = new this.auth.nativeWindow.Razorpay(this.options);
//   this.rzp1.open();
//   this._cartservice.removeAllItem();
//   this.al;
// }

  removeItem(item: any){
    this._cartservice.removeCartItem(item);
    this._toast.error("","Product removed from the cart!");
  }

  emptyCart(){
    this._cartservice.removeAllItem();
    this._toast.error("","Cart emptied!");
  }

  billCart(){
    this._cartservice.removeAllItem();
    this._toast.success("","Checkout successfull!");
  }

  back(){
    this._loc.back();
  }

  onIncrement(){
    this.store.dispatch(increment());
  }
  onDecrement(){
    if(this.counter>=2){
    this.store.dispatch(decrement());
    }
  }

 billForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email:['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(10)]],
    address: ['', [Validators.required, Validators.minLength(3)]],
    invoicedate: [this.Today, [Validators.required]],
});

postBill(billForm: FormGroup) {
  if(this.billForm.valid){
    try{
    this._billservice.postBill(this.billForm.value).subscribe((result) => {
      this._toast.success("","Bill generated successfully");
    })
    console.log(this.products)
  }
  catch(error){
    this._toast.error("","Bill generation not successful" + error);
  }
}
else{
  this._toast.warning("Warning!","Please fill the valid details before submitting!");
}
}
}
