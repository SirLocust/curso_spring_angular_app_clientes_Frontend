import { Cliente } from './cliente';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente()
  titulo:string = "Crear Cliente"
  constructor() { }

  ngOnInit(): void {
  }

  public create():void{
    console.log("clic")
    console.log(this.cliente)
  }

}
