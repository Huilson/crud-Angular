import { Component, Input } from '@angular/core';
import { Conteudo } from '../conteudo/model/conteudo';
import { ActivatedRoute, Router } from '@angular/router';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { ConteudoComponent } from '../conteudo/conteudo.component';

@Component({
  selector: 'app-conteudo-index',
  standalone: true,
  imports: [AppMaterialModule, ConteudoComponent],
  templateUrl: './conteudo-index.component.html',
  styleUrl: './conteudo-index.component.scss'
})
export class ConteudoIndexComponent {
  @Input() conteudo: Conteudo[] = [];
  readonly displayedColumns = ['_id', 'nome', 'cpf', 'numero', 'actions'];

  constructor(    
    private router: Router,
    private route: ActivatedRoute){  }

  onAdd(){
    console.log('onAdd');
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
