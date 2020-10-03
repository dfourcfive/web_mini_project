import {Component} from '@angular/core';
import {FormArray, FormBuilder,FormGroup,Validators} from '@angular/forms';
import { ApiService } from '../../api.service';
import {DataService} from '../../data.service';
import {Router} from '@angular/router';

@Component({
    selector:'app-module-edit',
    templateUrl:'./module-edit.component.html',
    styleUrls:['./module-edit.component.css']
})

export class ModuleEditComponenet{
    MyForm:FormGroup;
    UserId:string;
    ModuleId:string;
    nom_de_module='';
    description='';
    tmp;
    result=[];

    //
    constructor(private router: Router,private fb:FormBuilder,private apiService: ApiService,private dataService:DataService){
        console.log('the editing is here')
        let nom=this.dataService.Get_Nom();
        let desc=this.dataService.Get_description();
        this.MyForm=this.fb.group({
            nom_de_module:[nom, Validators.required],
            description:[desc, Validators.required],
            cours:this.fb.array([]),
        });
        this.tmp=this.dataService.Get_Cours();
        this.tmp.forEach((data,index)=>{
            console.log(data.titre);
            this.addOldCour(data.titre,data.description)
            
        })   
        //
        this.UserId=this.apiService.IdUserSubject.value;
        this.ModuleId=this.dataService.getModel()._id
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
    
    
    // instead of patchValue i made this cos 
    oldCour(t,d): FormGroup {
        return this.fb.group({
          titre: t,
          description: d,
        })
      }
    addOldCour(t,d){
        this.cours().push(this.oldCour(t,d));
    } 
    //


    removeCour(i:number){
        this.cours().removeAt(i);
    }

    onSubmit(){
        console.log(this.MyForm.value);
        this.Update()
        
    }

    ngOnInit(): void{   
 
    }
    Update(){
       // this.UserId=this.apiService.GetUserId();
        this.apiService.UpdateModule(this.UserId,this.ModuleId,this.MyForm.value.nom_de_module,this.MyForm.value.description,this.MyForm.value.cours).subscribe((res)=>{
            console.log(this.UserId+"______"+this.ModuleId);
            console.log('smt idk') 
            this.router.navigateByUrl('/mymodules');
        })

    }
}