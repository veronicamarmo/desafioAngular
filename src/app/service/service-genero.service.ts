import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CriarGenero, CriarUsuario } from '../models/salvar-usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SalvarGenerosService {
  listaGeneros: any;

  private listaGenero!: CriarGenero[];
  private url = 'http://localhost:3000/generos';

  constructor(private httpClient: HttpClient) {
    this.listaGeneros=[];
  }

  lerGenero(): Observable<CriarGenero[]> {
    return this.httpClient.get<CriarGenero[]>(this.url);
  }

  salvarGenero(cliente: CriarGenero): Observable<CriarGenero> {
    return this.httpClient.post<CriarGenero>(this.url, cliente);
  }

  deleteGenero(idfilCriarFilmes: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}/${idfilCriarFilmes}`);
  }

  editarGenero(genero:CriarGenero):Observable<CriarGenero[]>{
    return this.httpClient.put<CriarGenero[]>(`${this.url}/${genero.id}`,genero);
   }
}

