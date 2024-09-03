import { Routes } from '@angular/router';
import { ConteudoResolver } from './lista/guards/conteudo.resolver';
import { ConteudoFormComponent } from './lista/conteudo-form/conteudo-form.component';
import { ConteudoComponent } from './lista/conteudo/conteudo.component';

export const routes: Routes = [
    {
        path: 'conteudo',
        children: [
            {
                path: '',
                component: ConteudoComponent
            },
            {
                path: 'new',
                component: ConteudoFormComponent,
                resolve: { conteudo: ConteudoResolver }
            },
            {
                path: 'edit/:id',
                component: ConteudoFormComponent,
                resolve: { conteudo: ConteudoResolver }

            }
        ],
    }
];