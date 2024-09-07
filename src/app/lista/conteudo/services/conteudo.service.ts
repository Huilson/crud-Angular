import { Injectable } from '@angular/core';
import { Conteudo } from '../model/conteudo';
import { HttpClient } from '@angular/common/http';
import { first, tap } from 'rxjs';
import { ConteudoPage } from '../model/conteudo-page';


@Injectable({
  providedIn: 'root'
})

export class ConteudoService {

  private readonly API = 'api/lista';

  constructor(private http: HttpClient) {}   
  
  list(pages = 0, size = 10) {
    console.log('indexing');
    return this.http.get<ConteudoPage>(this.API, {params: { pages, size }})
    .pipe(
      first(),
      tap(conteudo => console.log('caiu no list'))
    );
  }

  loadByNome(pages = 0, size = 10, nome: string) {
    console.log('load by nome', nome);    
    return this.http.get<ConteudoPage>(this.API+'/filter/'+nome, {params: { pages, size }})
    .pipe(
      first(),
      tap(conteudo => console.log('caiu no list nome'))
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
    return this.http.delete(this.API+'/'+id).pipe(first());
  }  
}
