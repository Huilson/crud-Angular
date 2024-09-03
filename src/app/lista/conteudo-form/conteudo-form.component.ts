import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConteudoService } from '../conteudo/services/conteudo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Conteudo } from '../conteudo/model/conteudo';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { of } from 'rxjs';

@Component({
  selector: 'app-conteudo-form',
  standalone: true,
  imports: [
    AppMaterialModule, 
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ReactiveFormsModule],
  templateUrl: './conteudo-form.component.html',
  styleUrl: './conteudo-form.component.scss',

})
export class ConteudoFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: ConteudoService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      _id: [''],
      nome: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200)]],
      cpf: ['', [
        Validators.required,
        Validators.minLength(11)]],
      numero: ['', [
        Validators.required,
        Validators.minLength(13)]]
    })
  }

  ngOnInit(): void {
    const conteudo: Conteudo = this.route.snapshot.data['conteudo'];
    this.form.setValue({
      _id: conteudo._id,
      nome: conteudo.nome,
      cpf: conteudo.cpf,
      numero: conteudo.numero
    })
  }

  onSubmit() {
    //console.log(this.form.value);
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

  errorMessage(fieldName: string) {
    const field = this.form.get(fieldName);          
      if (field?.hasError('required')) {
        return 'Campo obrigatório';
      }
      if (field?.hasError('minlength')) {
        const minLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
        return 'O tamanho minímo precisa ser de ' + minLength + ' caracteres';
      }
      if (field?.hasError('maxlength')) {
        const maxLength = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
        return 'O tamanho máximo precisa ser de ' + maxLength + ' caracteres';
      }
      if (field?.hasError('minlength') && fieldName === 'cpf') {
        const minLength = field.errors ? field.errors['minlength']['requiredLength'] : 14;
        return 'O tamanho precisa ser de ' + minLength + ' caracteres';
      }
      if (field?.hasError('minlength') && fieldName === 'contato') {
        const minLength = field.errors ? field.errors['minlength']['requiredLength'] : 17;
        return 'O tamanho precisa ser de ' + minLength + ' caracteres';
      }
    return 'Campo inválido';  
  }
}