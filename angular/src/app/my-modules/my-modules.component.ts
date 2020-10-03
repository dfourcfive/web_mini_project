import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Observable} from 'rxjs/Observable';
import {module} from '../models/module';
import {DataService} from '../data.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-modules',
  templateUrl: './my-modules.component.html',
  styleUrls: ['./my-modules.component.css']
})
export class MyModulesComponent implements OnInit {
  modules:module[];
  UserId:string;
  constructor(private router: Router,private apiService: ApiService,private dataService:DataService) {
    this.UserId=this.apiService.IdUserSubject.value
   }

  ngOnInit(): void {
    // this.UserId=this.apiService.GetUserId();
    //testing userId 
    console.log(this.UserId);
    this.apiService.getMyModules(this.UserId).subscribe((data: module[])=>{
     this.modules=data;
     this.modules.forEach(function(value,index){
       value.cours.forEach(function(v,i){
         console.log(v.titre+"_____"+v.description)
       })
     })
    })
  }

  SendToEdit(i){
   this.dataService.PassIt(this.modules[i])
  }
  DeleteModule(i){
    this.apiService.deleteModule(this.UserId,this.modules[i]._id).subscribe((res)=>{
      if(res){
        this.router.navigateByUrl('/home')}
    })
  }

}
