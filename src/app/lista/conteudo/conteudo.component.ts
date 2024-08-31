import { Component } from '@angular/core';
import { Conteudo } from './model/conteudo';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { ConteudoService } from './services/conteudo.service';
import { catchError, Observable, of } from 'rxjs';
import { error } from 'console';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-conteudo',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './conteudo.component.html',
  styleUrl: './conteudo.component.scss'
})
export class ConteudoComponent {
  conteudo$: Observable <Conteudo[]>;
  displayedColumns = ['_id', 'nome', 'cpf', 'numero'];

  constructor(
    private service: ConteudoService,
    public dialog: MatDialog
  ) {
    this.service = this.service.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar!')
        return of([])
      })
    );
  }

  onError(msg: string){
    this.dialog.open(ErrorDialogComponent,{
      data: msg
    });

  }
}