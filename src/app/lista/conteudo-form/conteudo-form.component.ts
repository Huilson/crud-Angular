import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: ConteudoService, private snackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      nome: [null],
      cpf: [null],
      numero: [null]
    });
  }

  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      of(this.service.save(this.form.value)).subscribe({
        next: (data) => console.log(data),
        error: () => { this.onError(); }
      });
    }
  }

  onCancel() {

  }

  private onError() {
    this.snackBar.open('erro ao salvar', '', { duration: 3000 });
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }
}
