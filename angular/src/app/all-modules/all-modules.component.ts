import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {module} from '../models/module';

import { ApiService } from '../api.service';



@Component({
  selector: 'app-all-modules',
  templateUrl: './all-modules.component.html',
  styleUrls: ['./all-modules.component.css']
})
export class AllModulesComponent implements OnInit {
  modules=[];
	constructor(private apiService: ApiService) { }


  ngOnInit(): void {
    this.apiService.getAllModules().subscribe((data: module[])=>{  
      console.log(data);  
      data.forEach(element=>{
        if(element){
          this.modules.push(element)
        }
      })
    })  
  }
}
