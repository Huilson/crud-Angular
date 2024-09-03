import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaRoutingModule } from './lista-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { ConteudoComponent } from './conteudo/conteudo.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  providers: [provideHttpClient()],
  imports: [
    ConteudoComponent,
    CommonModule,
    ListaRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule    
  ]
})
export class ListaModule { }
