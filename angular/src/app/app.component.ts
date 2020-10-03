import { Component } from '@angular/core';
import {ApiService} from './api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mini-projet';
  isAuthenticated: boolean;

  constructor(private apiService: ApiService) { 
    this.init()
  }
  
  ngOnChanges():void{

  }
  loggingOut(){
    this.apiService.signOut()

  }
  init(){
    this.apiService.authSubject.subscribe(value=>{
      this.isAuthenticated=value;
      console.log(this.isAuthenticated)
    })
    console.log(this.isAuthenticated)
  }

  
}
