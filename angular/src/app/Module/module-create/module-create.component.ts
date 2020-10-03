import { style } from '@angular/animations';
import {Component} from '@angular/core';
import {FormArray, FormBuilder,FormGroup,Validators} from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
    selector:'app-module-create',
    templateUrl:'./module-create.component.html',
    styleUrls:['./module-create.component.css']
})

export class ModuleCreateComponenet{
    MyForm:FormGroup;
    UserId:string;
    nom_de_module='';
    description='';

    
    constructor(private router: Router,private fb:FormBuilder,private apiService: ApiService){
        this.UserId=this.apiService.IdUserSubject.value
        console.log('this is module create cmpnnt id='+ this.UserId)
        this.MyForm=this.fb.group({
            nom_de_module:['', Validators.required],
            description:['', Validators.required],
            cours:this.fb.array([]),
        });
    }
    cours():FormArray{
        return this.MyForm.get("cours") as FormArray
    }
    newCour(): FormGroup {
        return this.fb.group({
          titre: '',
          description: '',
        })
      }
    addNewCour(){
        this.cours().push(this.newCour());
    }  
    removeCour(i:number){
        this.cours().removeAt(i);
    }

    onSubmit(){
        console.log(this.MyForm.value);
        this.createModule()
    }

    ngOnInit(): void{

    }
    createModule(){
       // this.UserId=this.apiService.GetUserId();
        this.apiService.CreateModule(this.UserId,this.MyForm.value.nom_de_module,this.MyForm.value.description,this.MyForm.value.cours).subscribe((res)=>{
         console.log(this.MyForm.value);
            console.log('smt idk')
            this.router.navigateByUrl('/home')
        })

    }
}