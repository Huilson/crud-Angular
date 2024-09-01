import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConteudoComponent } from './conteudo/conteudo.component';
import { ConteudoFormComponent } from './conteudo-form/conteudo-form.component';

const routes: Routes = [
  { path: '', component: ConteudoComponent },
  { path: 'new', component: ConteudoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaRoutingModule { }
