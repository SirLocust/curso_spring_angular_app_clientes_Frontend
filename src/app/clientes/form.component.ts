import { ClienteService } from './cliente.service';
import { Cliente } from './cliente';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from "sweetalert2";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente()
  titulo:string = "Crear Cliente"
  constructor(private ClienteService: ClienteService,
              private router:Router) { }

  ngOnInit(): void {
  }

  public create():void{
    this.ClienteService.create(this.cliente).subscribe(
      cliente  => {
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo Cliente', `cliente ${cliente.nombre} creado con exito`, 'success')
      }
    )
    
  }

}
