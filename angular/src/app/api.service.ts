import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject, from } from  'rxjs';
import {user} from './models/user'


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private SERVER_URL = "http://localhost:3000/api";
  authSubject  =  new  BehaviorSubject(false);
  IdUserSubject = new BehaviorSubject('0');



  constructor(private httpClient: HttpClient) { }




  //this method allows getting all modules 
  public getAllModules(){  
    return this.httpClient.get(`${this.SERVER_URL}/modules`); 
     
  } 
  

  register(email,password): Observable<any> {
    return this.httpClient.post<any>(`${this.SERVER_URL}/registre`, {
      "email":email,
      "password":password
    }).pipe(
      tap((res:any ) => {
        if (res.id) {
          this.authSubject.next(true);
          console.log(this.authSubject.value)
          this.IdUserSubject.next(res.id);
          console.log(res.id)

        }
      })

    );
  }

  //this method allows user to get its modules
  getMyModules(UserId):Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/myModules/`+UserId)
  }

  //this method allows user to update a certain module  
  UpdateModule(UserId,ModuleId,nom,description,cours):Observable<any>{
    return this.httpClient.post(`${this.SERVER_URL}/edit/`+UserId+'/'+ModuleId,{
      "nom":nom,
      "description":description,
      "cours":cours
    })
  }
  
  //this method allows user to creat a module
  CreateModule(UID,nom,description,cours):Observable<any>{
    return this.httpClient.post(`${this.SERVER_URL}/create/`+UID,{
      "nom":nom,
      "description":description,
      "cours":cours
    })
  }

  singIn(email,password):Observable<any> {
    return this.httpClient.post(`${this.SERVER_URL}/login`, {
      "email":email,
      "password":password
    }).pipe(
      tap(async (res: any) => {

        if (res.token) {
          this.authSubject.next(true);
          this.IdUserSubject.next(res.id);
          console.log(this.IdUserSubject.value)
        }
      })
    );
  }
  deleteModule(UID,MID):Observable<any>{
    return this.httpClient.delete(`${this.SERVER_URL}/delete/`+UID+'/'+MID)
  }
  isAuthenticated() {
    return  this.authSubject.asObservable();
  }
  GetUserId(){
    if (this.authSubject.value){
      return this.IdUserSubject.value
    }
    else return ;
  }
  signOut() {
    localStorage.removeItem("USER_ID");
    this.authSubject.next(false);
    console.log(this.authSubject.value)
  }






}
