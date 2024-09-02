import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConteudoService } from '../conteudo/services/conteudo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { error } from 'console';

@Component({
  selector: 'app-conteudo-form',
  standalone: true,
  imports: [AppMaterialModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './conteudo-form.component.html',
  styleUrl: './conteudo-form.component.scss'
})
export class ConteudoFormComponent {

  form: UntypedFormGroup;

  constructor(private UntypedFormBuilder: UntypedFormBuilder, private service: ConteudoService, private snackBar: MatSnackBar, private location: Location) {
    this.form = this.UntypedFormBuilder.group({
      nome: [null],
      cpf: [null],
      numero: [null]
    });
  }

  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      of(this.service.save(this.form.value)).subscribe({
        next: () => { this.onSuccess() },
        error: () => { this.onError() }
      });
    }
  }

  onReturn() {
    this.location.back();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar...', '', { duration: 3000 });
  }

  private onSuccess() {    
    this.snackBar.open('Salvo com sucesso!', '', { duration: 5000 });
    this.onReturn();
  }
}
