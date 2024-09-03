import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConteudoService } from '../conteudo/services/conteudo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Conteudo } from '../conteudo/model/conteudo';

@Component({
  selector: 'app-conteudo-form',
  standalone: true,
  imports: [AppMaterialModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
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
      nome: [''],
      cpf: [''],
      numero: ['']
    })
  }

  ngOnInit(): void {
    const conteudo : Conteudo = this.route.snapshot.data['conteudo'];    
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
}