import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
 import checkPasswords from 'src/app/shared/validators/checkPasswords.validator';
import { ToastrService } from '../../shared/services/toastr/toastr.service';
 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  public loginInvalid = false;
 
  constructor(
    private fb: FormBuilder,
    private router: Router,
     private authService:AuthService,
     private toastrService:ToastrService
   ) {
 
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, { validators: checkPasswords });
  }

  ngOnInit()  {}

  onSubmit():void {
    if (this.form.valid) {
         const email = this.form.get('email')?.value;
        const password = this.form.get('password')?.value;
        const repeatPassword = this.form.get('repeatPassword')?.value;
        if(password == repeatPassword){
          this.authService.SignUp(email,password).then((res)=>{
            localStorage.setItem('user',JSON.stringify(res))
            this.toastrService.openSnackBar("Done Successfully !","You signed up successfully")
            this.authService.isLoggedIn.next(true)
            this.router.navigateByUrl("/pages/quiz")
          }).catch((err)=>{
            this.toastrService.openSnackBar("Failed !",err)
          })
        }
       } 
    }

 }
