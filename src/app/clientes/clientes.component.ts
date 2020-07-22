import { ClienteService } from './cliente.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import swal from 'sweetalert2';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] ;
  
  constructor(private clienteServices: ClienteService) { }

  ngOnInit(): void {
    this.clienteServices.getClientes().subscribe( clientes => {
      this.clientes = clientes
    })
  }

  delete(cliente: Cliente):void{
    swal.fire({
      title: 'Esta Seguro ',
      text: `seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si elimninar'
    }).then((result) => {
      if (result.value) {

        this.clienteServices.delete(cliente.id).subscribe(
          Response =>{
            this.clientes = this.clientes.filter( client => client !== cliente)
            swal.fire(
              'Cliente Eliminado',
              `Cliente ${cliente.nombre} eliminado con exito `,
              'success'
            )
          }
        )
       
      }
    })
  }

}
