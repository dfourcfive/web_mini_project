import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service'
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;



  constructor(private apiService: ApiService, private router: Router,private formBuilder: FormBuilder    ) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required]
    });

  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.login(this.loginForm)
  }

  login(form){
    console.log(form.value);
    this.apiService.singIn(form.value.email,form.value.password).subscribe((res)=>{
      if (res.token){
        console.log("Logged in!");
        this.router.navigateByUrl('home');
      }
      else{
        console.log("Not Logged in!");
        
      }
     // this.router.navigateByUrl('home');
    });    

  }
  /*
   login(form){
    console.log(form.value);
    this.apiService.singIn(form.value.email,form.value.password).subscribe((res)=>{
      console.log(res);
    
      if(res.token){
        console.log('user logged in')
        //redirect to home page
        return;
      }
      else {
        console.log('failed logging in')
      }

     // this.router.navigateByUrl('home');
    });    
  }
  */

}
