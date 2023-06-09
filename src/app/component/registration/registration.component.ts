import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import { AngularToastService } from 'angular-toasts';
import { PasswordValidator } from 'src/app/shared/password.validator';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  type: string ="password";
  isText:boolean = false;
  eyeIcon:string = "fa-eye-slash";
  signuser : any;
  
  @ViewChild('dob')dateofbirth: ElementRef;
  @ViewChild('age')agefromdob: ElementRef;

  constructor(private fb: FormBuilder, private router: Router, private _http : HttpClient, private _toast: AngularToastService){}

  registrationForm = this.fb.group({
    name:['', [Validators.required, Validators.minLength(3)]],
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required]],
    conpwd:['', [Validators.required]],
    gender:['', [Validators.required]],
    dob:['', [Validators.required]],
    age:[, [Validators.required]],
    description:['', [Validators.required]],
    occupation:[, [Validators.required]],
    tnc:[false, [Validators.required]],
    interest1:[''],
    interest2:[''],
    interest3:[''],
  }, {validator: PasswordValidator});

  // onSubmit(){
  //   if (this.registrationForm.valid) {
  //     console.log(this.registrationForm.valid);
  //   this.router.navigateByUrl('/login');
  //   } 
  //   else {
  //     window.alert('Please fill all the fields with valid inputs!')
  //   }
  // }

  hideshowpwd(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-solid fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  registerdata(registrationForm: FormGroup){
    //console.log(this.registrationForm.value);
    //this.signuser = this.registrationForm.value.name;  to retrieve the name of the registered user
    this._http.post<any>("https://angular-jsonserver.vercel.app/users", this.registrationForm.value)
    .subscribe(res=>{
      if(this.registrationForm.valid){
      this._toast.success("Registration Successful!", "Please Login!");
      this.registrationForm.reset();
      this.router.navigate(['login']);
      }
      else{
        this._toast.warning("Warning!", "Please fill the valid details before submitting!");
      }
    }, err=>{
      alert("Something went wrong!");
    })
  }

  displayage(){
    let birthyear = new Date(this.dateofbirth.nativeElement.value).getFullYear();
    let currentyear = new Date().getFullYear();
    let agee = currentyear - birthyear;
    this.agefromdob.nativeElement.value = agee;
  }
}
