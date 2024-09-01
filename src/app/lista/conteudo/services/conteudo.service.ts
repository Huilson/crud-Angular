import { Injectable } from '@angular/core';
import { Conteudo } from '../model/conteudo';
import { HttpClient } from '@angular/common/http';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConteudoService {

  private readonly API = 'lista';

  constructor(private httpClient: HttpClient) { }
  
  list() {
    return this.httpClient.get<Conteudo[]>(this.API).pipe(
      first(),
      tap(conteudo => console.log(conteudo))
    );
  }
}
