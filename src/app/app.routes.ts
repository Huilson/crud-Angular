import { Routes } from '@angular/router';
import { ConteudoComponent } from './lista/conteudo/conteudo.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'conteudo' },
    { path: 'conteudo', loadChildren: () => import('./lista/lista.module').then(m => m.ListaModule) }
];
