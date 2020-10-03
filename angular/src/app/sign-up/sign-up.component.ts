import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service'
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  MessageResult;
  RegistreForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  email:string;
  password:string;
  
  constructor(private apiService: ApiService, private router: Router,private formBuilder: FormBuilder   ) { }


  ngOnInit(): void {
    this.RegistreForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required]
    });
  }

  submit() {
    if (!this.RegistreForm.valid) {
      return;
    }
    this.registre(this.RegistreForm)
  }

  registre(form) {
    console.log(form.value);
    this.apiService.register(form.value.email,form.value.password).subscribe((res) => {
      if (res.id){
        console.log("user created and logged in!");
        this.MessageResult='user created and logged in!';
        this.router.navigateByUrl('home');
      }
      else{
        console.log("Not Logged in!");
        this.MessageResult='wrong email /* password!';
      }
    });
  }

}
