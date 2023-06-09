import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormArray, FormBuilder, NgForm, Validators } from '@angular/forms';
import { ProductService } from 'src/app/product.service';
import { AngularToastService } from 'angular-toasts';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  public prods: any[] = [];
  @ViewChild('productsForm') form: NgForm;
  editmode: boolean = false;
  currentprodid: number;

  constructor(private _productlist: ProductService,private _toast : AngularToastService, private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.PL();
  }

    productsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      img1: ['', [Validators.required]],
      img2: ['', [Validators.required]],
      img3: ['', [Validators.required]],
      img4: ['', [Validators.required]],
      price: ['', [Validators.required]],
      brand: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', [Validators.required]],
      type: ['', [Validators.required, Validators.minLength(3)]],
      star: ['', [Validators.required]],
      ratings: ['', [Validators.required]],
      discountedprice: ['', [Validators.required]],
      seller: ['', [Validators.required, Validators.minLength(3)]]
  });


  postProducts(productsForm: any) {
    if(this.productsForm.valid){
    if (!this.editmode){
      try{
      this._productlist.postProduct(productsForm).subscribe((result) => {
        this._toast.success("","Product Added successfully");
      this.productsForm.reset();
      this.PL();
      })
    }
    catch(error){
      this._toast.error("","Product addition not successful" + error);
    }
    }
  
    else {
      try{
      this._productlist.updateProduct(this.currentprodid, productsForm).subscribe((result) => {
        this._toast.success("", "Update successful");
      this.PL();
      this.productsForm.reset();
      })
    }
  
      catch(error){
        this._toast.error("","Update not successful" + error);
      }
    }
  }
  else{
    this._toast.warning("Warning!","Please fill the valid details before submitting!");
  }
      
    
  }

  deleteProducts(id: number) {
    this._productlist.deleteProduct(id).subscribe((data) => {
      this._toast.error("", "Product deleted successfully!");
      this.PL();
    })
  }

  updateProducts(id: number) {
    window.scrollTo(0,0);
    this.currentprodid = id;
    //get the product based on id
    let currentprod = this.prods.find((p) => { return p.id === id })

    //populate the data
    this.productsForm.setValue({
      name: currentprod.name,
      description: currentprod.description,
      img1: currentprod.img1,
      img2: currentprod.img2,
      img3: currentprod.img3,
      img4: currentprod.img4,
      price: currentprod.price,
      brand: currentprod.brand,
      category: currentprod.category,
      gender: currentprod.gender,
      type: currentprod.type,
      star: currentprod.star,
      ratings: currentprod.ratings,
      discountedprice: currentprod.discountedprice,
      seller: currentprod.seller
    });

    //change the add button to update button
    this.editmode = true;
  }

  public PL(): void {
    this._productlist.getProdList()
      .subscribe(data => {
        this.prods = data

        this.prods.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price });
        });
      })
  }
}
