import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component'
import {MyModulesComponent} from './my-modules/my-modules.component'
import {SignUpComponent} from './sign-up/sign-up.component'
import {AllModulesComponent} from './all-modules/all-modules.component'
import {ModuleCreateComponenet} from './Module/module-create/module-create.component'
import {ModuleEditComponenet} from './Module/module-edit/module-edit.component'
const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'home', component: AllModulesComponent },
  { path:'mymodules',component:MyModulesComponent},
  { path:'SignUp',component:SignUpComponent},
  { path:'create',component:ModuleCreateComponenet},
  { path:'edit',component:ModuleEditComponenet}
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


  

 }
