import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
 
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ToastrService } from '../../shared/services/toastr/toastr.service';
  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService:AuthService,
    private toastrService:ToastrService
   ) {
 
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
 
  }

  onSubmit() {
    
    if (this.form.valid) {
        const email = this.form.get('email')?.value;
        const password = this.form.get('password')?.value;
        this.authService.SignIn(email,password).then( res =>{
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
