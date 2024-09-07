import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Conteudo } from '../conteudo/model/conteudo';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { ConteudoComponent } from '../conteudo/conteudo.component';
import { NgxMaskDirective, NgxMaskPipe} from 'ngx-mask';


@Component({
  selector: 'app-conteudo-index',
  standalone: true,
  imports: [AppMaterialModule, ConteudoComponent, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './conteudo-index.component.html',
  styleUrl: './conteudo-index.component.scss'
})
export class ConteudoIndexComponent {
  @Input() conteudo: Conteudo[] = [];
  @Output() typeNome = new EventEmitter(false);
  @Output() clickAdd = new EventEmitter(false);
  @Output() clickEdit = new EventEmitter(false);
  @Output() clickDelete = new EventEmitter(false);  

  readonly displayedColumns = ['_id', 'nome', 'cpf', 'numero', 'actions'];

  onAdd(){    
    this.clickAdd.emit(true);
    //console.log('Send Emit');
  }

  onEdit(conteudo: Conteudo){
    this.clickEdit.emit(conteudo);
    //console.log(conteudo+' sent to update');
  }

  onDelete(conteudo: Conteudo){
    this.clickDelete.emit(conteudo);
    //console.log(conteudo+' sent to delete');
  }

  onSearch(event: Event){    
    this.typeNome.emit(event);
    //console.log(filterValue.trim().toLowerCase()+' searching...');
  }  
}