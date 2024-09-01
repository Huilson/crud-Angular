import { Component } from '@angular/core';
import { Conteudo } from './model/conteudo';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { ConteudoService } from './services/conteudo.service';
import { catchError, Observable, of } from 'rxjs';
import { error } from 'console';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { relative } from 'path';

@Component({
  selector: 'app-conteudo',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './conteudo.component.html',
  styleUrl: './conteudo.component.scss'
})
export class ConteudoComponent {
  conteudo$: Observable <Conteudo[]>;
  displayedColumns = ['_id', 'nome', 'cpf', 'numero', 'actions'];

  constructor(
    private service: ConteudoService,
    public dialog: MatDialog,
    private router : Router,
    private route: ActivatedRoute
  ) {
    this.conteudo$ = this.service.list()
  }

  /*onError(msg: string){
    this.dialog.open(ErrorDialogComponent,{
      data: msg
    });
  }*/

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}