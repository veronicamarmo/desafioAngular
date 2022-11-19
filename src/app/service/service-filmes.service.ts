import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmesComponent } from '../filmes/filmes.component';
import { CriarFilmes } from '../models/salvar-usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SalvarFilmesService {

  listaFiilmes: any;

  private listaFilmes!: CriarFilmes[];
  private url = 'http://localhost:3000/filmes';

  constructor(private httpClient: HttpClient) {
    this.listaFiilmes=[];
  }

  lerFilmes(): Observable<CriarFilmes[]> {
    return this.httpClient.get<CriarFilmes[]>(this.url);
  }

  salvarFilmes(cliente: CriarFilmes): Observable<CriarFilmes> {
    return this.httpClient.post<CriarFilmes>(this.url, cliente);
  }

  deleteFilmes(idfilCriarFilmes: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}/${idfilCriarFilmes}`);
  }

  editarFilmes(filmes:CriarFilmes):Observable<CriarFilmes[]>{
    return this.httpClient.put<CriarFilmes[]>(`${this.url}/${filmes.id}`,filmes);
   }
}
