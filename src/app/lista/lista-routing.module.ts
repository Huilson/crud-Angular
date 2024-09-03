import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConteudoFormComponent } from './conteudo-form/conteudo-form.component';
import { ConteudoResolver } from './guards/conteudo.resolver';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'conteudo' },
    //{ path: 'conteudo', loadChildren: () => import('./lista.module').then(m => m.ListaModule) },
    { path: 'new', component: ConteudoFormComponent, resolve: {conteudo: ConteudoResolver} },
    { path: 'edit/:id', component: ConteudoFormComponent, resolve: {conteudo: ConteudoResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaRoutingModule { }