import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CriarUsuario } from '../models/salvar-usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SalvarUsuarioService {
  salvarcliente(cliente: CriarUsuario) {
    throw new Error('Method not implemented.');
  }
  lerUsuario() {
    throw new Error('Method not implemented.');
  }
  private listaUsuarios!: CriarUsuario[];
  private url = 'http://localhost:3000/usuarios';

  constructor(private httpClient: HttpClient) {
    this.listaUsuarios = [];
  }

  get usuario() {
    return this.listaUsuarios;
  }

  lerUsuarios(): Observable<CriarUsuario[]> {
    return this.httpClient.get<CriarUsuario[]>(this.url);
  }

  salvarUsuarios(cliente: CriarUsuario): Observable<CriarUsuario> {
    return this.httpClient.post<CriarUsuario>(this.url, cliente);
  }

  deleteUsuario(idUsuario:any):Observable<any>{
    return this.httpClient.delete<any>(`${this.url}/${idUsuario}`);
 }

 editarUsuario(usuario:CriarUsuario):Observable<CriarUsuario[]>{
  return this.httpClient.put<CriarUsuario[]>(`${this.url}/${usuario.id}`,usuario);
 }
}