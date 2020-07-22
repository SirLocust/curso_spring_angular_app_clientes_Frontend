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
  constructor(private clienteService: ClienteService, private router: Router , private activateRouter:ActivatedRoute) {}

  ngOnInit(): void {
    this.cargarCliente();
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe((cliente) => {
      this.router.navigate(['/clientes']);
      swal.fire(
        'Nuevo Cliente',
        `cliente ${cliente.nombre} creado con exito`,
        'success'
      );
    });
  }

  cargarCliente():void{
    this.activateRouter.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id)
        .subscribe( cliente => {
          this.cliente = cliente
        } )
      }
    })
  }

}
