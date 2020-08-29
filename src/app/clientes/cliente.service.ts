import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable , throwError  } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map , catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'})

  constructor(private http: HttpClient , private router:Router) { }

  getClientes(): Observable<Cliente[]>{
    
    // return of(CLIENTES);
    return this.http.get<Cliente[]>(this.urlEndPoint).pipe(
      map( Response => {
        let clientes =Response as Cliente[]
        return  clientes.map( (cliente:Cliente) => {
          cliente.nombre = cliente.nombre.toUpperCase()
          cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy' , 'en-US')
          return cliente
        });
      })
    )

  
    
  }
  create(cliente: Cliente) : Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint , cliente , {headers: this.httpHeaders}).pipe(
      map( (response:any) => response.cliente as Cliente ),
      this.manejorError("Error al Crear cliente")
    )
 }

 getCliente(id): Observable<Cliente>{
   let mensajeError = "Error Al Editar Cliente"
   return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
     this.manejorError(mensajeError,true,'/clientes')
     
   );
 }

 update(cliente: Cliente): Observable<Cliente>{
   return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders} ).pipe(
    map( (response:any) => response.cliente as Cliente ),
     this.manejorError("Error al actulizar cliente")
   )
 }

 delete(id: Number): Observable<Cliente>{
   return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders}  ).pipe(
    this.manejorError("Error al eliminar cliente")
   )
 }

 manejorError(mensajeError:string,redirecion?:boolean,url?:string): typeof throwError{
  return catchError( e => {

    if(e.status == 400){
      return throwError(e);
    }

    if(redirecion){
      this.router.navigate([`${url}`])

    }
    Swal.fire(mensajeError, e.error.mensaje, "error")
    return throwError(e)
    
  })
 }
}
 