import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ConteudoService } from '../conteudo/services/conteudo.service';
import { Conteudo } from '../conteudo/model/conteudo';



@Injectable({ providedIn: 'root' })

export class ConteudoResolver implements Resolve<Conteudo> {
  constructor(private service: ConteudoService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Conteudo> | Promise<Conteudo> | Conteudo {    
  if (route.params?.['id']) {    
    console.log('load by resolve', route.params['id']);
    return this.service.loadById(route.params['id']);    
  }
  return of({ _id: '', nome: '', cpf: '', numero: '' });
  }
}

/*
export const conteudoResolver: ResolveFn<Observable<Conteudo>> = (route, state, service: ConteudoService = inject(ConteudoService)) => {
  console.log('load by resolve');
  if (route.params?.['id']) {
    return service.loadById(route.params['id']);
  }
  return of({ _id: '', nome: '', cpf: '', numero: '' });
}
*/
