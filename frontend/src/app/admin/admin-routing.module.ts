import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component'; 
import { AdminComponent } from './admin.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ImportarComponent } from './importar/importar.component';
import { RolesGuard } from '../roles.guard';

const routes: Routes = [
  {
    path:'ferreteria',
    loadChildren:()=>import('./ferreteria/ferreteria.module').then(a => a.FerreteriaModule),
    // data:{
    //   role:'2'
    // },
    // canActivate:[RolesGuard],
  },
  {
    path:'barraca',
    loadChildren:()=>import('./barraca/barraca.module').then(a => a.BarracaModule),
    // data:{
    //   role:'2'
    // },
    // canActivate:[RolesGuard],
  },
    {
      component:AdminComponent,
      path:'',
      children:[
        {path:'home',component: HomeComponent},
        {path:'usuario',component: UsuarioComponent},
        {path:'perfil',component: PerfilComponent},
        {path:'cliente',component: ClienteComponent},
        {path:'proveedor',component: ProveedorComponent},
        {path:'importar',component: ImportarComponent},
        {path:'**',redirectTo:'home'},
      ]
    },    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }


// const routes: Routes = [
//   {
//     path:'logistica',
//     loadChildren:()=>import('./logistica/logistica.module').then(a => a.LogisticaModule),
//     data:{
//       role:'2'
//     },
//     canActivate:[RolesGuard],
//   },
//   {
//     path:'staff',
//     loadChildren:()=>import('./staff/staff.module').then(a => a.StaffModule),
//     data:{
//       role:'3'
//     },
//     canActivate:[RolesGuard]
//   },
//   {
//     path:'home',
//     loadChildren:()=>import('./home/home.module').then(a => a.HomeModule)
//   },
//   {
//     path:'**',
//     loadChildren:()=>import('./home/home.module').then(a => a.HomeModule)
//   }
