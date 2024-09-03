import { Component } from '@angular/core';
import { Conteudo } from './model/conteudo';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { ConteudoService } from './services/conteudo.service';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { ConteudoIndexComponent } from "../conteudo-index/conteudo-index.component";
import { CommonModule } from '@angular/common';
import { MatPaginator, PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { AsyncPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';

@Component({
  selector: 'app-conteudo',
  standalone: true,
  imports: [AppMaterialModule, ConteudoIndexComponent, CommonModule, AsyncPipe],
  templateUrl: './conteudo.component.html',
  styleUrl: './conteudo.component.scss'
})
export class ConteudoComponent {

  conteudo$: Observable<Conteudo[]> | null = null;

  constructor(
    private service: ConteudoService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {
    this.refresh();
  }

  onError(msg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: msg
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
    //console.log('Reciver onAdd');
  }

  onEdit(conteudo: Conteudo) {
    this.router.navigate(['edit', conteudo._id], { relativeTo: this.route });
    /*console.log('Reciver onEdit');
    console.log(conteudo._id);*/
  }

  onDelete(conteudo: Conteudo) {
    this.service.remove(conteudo._id).subscribe(
      () => {
        this.refresh();
        this.snackbar.open('Item excluido', '', { duration: 3000 })
      },
      () => this.onError('Erro ao remover item')
    );
  }

  refresh() {
    this.conteudo$ = this.service.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar lista');
        return of([]);
      })
    );
  }
}