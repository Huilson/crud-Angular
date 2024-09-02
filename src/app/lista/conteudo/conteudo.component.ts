import { Component } from '@angular/core';
import { Conteudo } from './model/conteudo';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { ConteudoService } from './services/conteudo.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { ConteudoIndexComponent } from "../conteudo-index/conteudo-index.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conteudo',
  standalone: true,
  imports: [AppMaterialModule, ConteudoIndexComponent, CommonModule],
  templateUrl: './conteudo.component.html',
  styleUrl: './conteudo.component.scss'
})
export class ConteudoComponent {

  conteudo$: Observable<Conteudo[]>;  

  constructor(
    private service: ConteudoService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.conteudo$ = this.service.list()
  }

  onError(msg: string){
    this.dialog.open(ErrorDialogComponent,{
      data: msg
    });
  }

  onAdd(){
    console.log('onAdd');
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}