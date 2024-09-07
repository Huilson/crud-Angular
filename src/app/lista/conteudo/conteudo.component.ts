import { Conteudo } from './model/conteudo';
import { ConteudoPage } from './model/conteudo-page';

import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { ConteudoService } from './services/conteudo.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { ConteudoIndexComponent } from "../conteudo-index/conteudo-index.component";
import { CommonModule } from '@angular/common';
import { MatPaginator, PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { AsyncPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogsComponent } from './dialogs/dialogs.component';

@Component({
  selector: 'app-conteudo',
  standalone: true,
  imports: [AppMaterialModule, ConteudoIndexComponent, CommonModule, AsyncPipe, MatPaginatorModule],
  templateUrl: './conteudo.component.html',
  styleUrl: './conteudo.component.scss'
})
export class ConteudoComponent {

  conteudo$: Observable<ConteudoPage> | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25];

  showPageSizeOptions = true;
  showFirstLastButtons = true;

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
    const dialogRef = this.dialog.open(DialogsComponent, {
      data: 'Deseja realmente remover esse item?',
    });

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.service.remove(conteudo._id).subscribe(
          () => {
            this.refresh();
            this.snackbar.open('Item excluido', '', { duration: 3000 })
          },
          () => this.onError('Erro ao remover item')
        );
      }
    });
  }

  onSearch(event: Event, pageEvent: PageEvent = {length:0, pageIndex: 0, pageSize: 10}) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.conteudo$ = this.service.loadByNome(pageEvent.pageIndex, pageEvent.pageSize, filterValue.trim().toLowerCase())
    .pipe(
      tap(() => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
      }),
      catchError(error => {
        this.onError('Erro ao carregar lista');
        return of({conteudo: [], totalElements: 0, totalPages: 0});
      })
    );
  }

  refresh(pageEvent: PageEvent = {length:0, pageIndex: 0, pageSize: 10}) {
    this.conteudo$ = this.service.list(pageEvent.pageIndex, pageEvent.pageSize)
    .pipe(
      tap(() => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
      }),
      catchError(error => {
        this.onError('Erro ao carregar lista');
        return of({conteudo: [], totalElements: 0, totalPages: 0});
      })
    );
  }
}