import { FormComponent } from './clientes/form.component';
import { ClientesComponent } from './clientes/clientes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectivaComponent } from './directiva/directiva.component';


const routes: Routes = [
  
  { path: 'clientes' ,  component: ClientesComponent},
  { path: 'directivas' ,  component: DirectivaComponent},
  { path: 'clientes/form', component: FormComponent},
  { path: 'clientes/form/:id', component: FormComponent},
  { path: '', pathMatch: 'full', redirectTo: '/clientes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
