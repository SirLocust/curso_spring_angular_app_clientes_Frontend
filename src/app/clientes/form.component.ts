import { ClienteService } from './cliente.service';
import { Cliente } from './cliente';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  cliente: Cliente = new Cliente();
  titulo: string = 'Crear Cliente';
  private errors:string[];
  constructor(private clienteService: ClienteService, private router: Router , private activateRouter:ActivatedRoute) {}

  ngOnInit(): void {
    this.cargarCliente();
  }

  create(): void {
    this.clienteService.create(this.cliente)
      .subscribe((cliente) => {
      this.router.navigate(['/clientes']);
      swal.fire(
        'Nuevo Cliente',
        `cliente ${cliente.nombre} creado con exito`,
        'success'
      ); 
    
      },
      err => {
        this.errors = err.error.errors as string[];
        
    });
  }

  cargarCliente():void{
    this.activateRouter.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.clienteService.getCliente(id)
        .subscribe( cliente => {
          this.cliente = cliente;
        } )
      }
    })
  }

  update():void {
    this.clienteService.update(this.cliente)
    .subscribe( cliente => {
      this.router.navigate(['/clientes']);
      swal.fire('Cliente Actualizado', `Cliente ${cliente.nombre} Actualizado con exito`, 'success');
    },
      err => {
        this.errors = err.error.errors as string[];
        
    }
    )
  }

  getErros():String[]{
    return this.errors
  }

}
