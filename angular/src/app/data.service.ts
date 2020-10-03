import { Injectable } from '@angular/core';
import {module} from './models/module'
@Injectable({
  providedIn: 'root'
})
export class DataService {
  data:module
  constructor() { }
  getModel(){
    return this.data
  }
  PassIt(tmp:module){
    this.data=tmp
  }
  Get_Nom(){
    return this.data.nom
  }
  Get_description(){
    return this.data.description
  }
  Get_Cours(){
    return this.data.cours
  }
}
