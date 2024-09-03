import { inject, Injectable } from '@angular/core';
import { Conteudo } from '../model/conteudo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ConteudoService {

  private readonly API = 'api/lista';

  constructor(private http: HttpClient) { }
  
  list() {
    console.log('indexing');
    return this.http.get<Conteudo[]>(this.API).pipe(
      first(),
      tap(conteudo => console.log('caiu no list'))
    );
  }

  loadById(id: string) {
    console.log('load by id', id);    
    return this.http.get<Conteudo>(this.API+'/'+id);    
  }

  save(conteudo: Partial<Conteudo>) {
    console.log(conteudo);
    if (conteudo._id) {
      console.log('update');
      return this.update(conteudo);
    }
    console.log('create');
    return this.create(conteudo);
  }

  private create(conteudo: Partial<Conteudo>) {
    return this.http.post<Conteudo>(this.API, conteudo).subscribe(
      c => {console.log('Updated config:', c)}
    );
  }

  private update(conteudo: Partial<Conteudo>) {
    return this.http.put<Conteudo>(this.API+'/'+conteudo._id, conteudo).subscribe(
      c => {console.log('Updated config:', c)}
    );
  }

  remove(id: string) {
    console.log('remove');
    return this.http.delete('${this.API}/${id}').pipe(first());
  }
}
