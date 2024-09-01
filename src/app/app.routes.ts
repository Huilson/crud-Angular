import { Routes } from '@angular/router';

export const routes: Routes = [
    //{ path: '', pathMatch: 'full', redirectTo: 'conteudo' },
    //{ path: 'conteudo', loadChildren: () => import('./lista/lista.module').then(m => m.ListaModule) }
    {
        path: 'conteudo',
        children: [
            {
                path: '',
                loadComponent: () => import('./lista/conteudo/conteudo.component').then((x)=> x.ConteudoComponent)
            },
            {
                path: 'new',
                loadComponent: () => import('./lista/conteudo-form/conteudo-form.component').then((x)=> x.ConteudoFormComponent),
            }
        ],
    }
];