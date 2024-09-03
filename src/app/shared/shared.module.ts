import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { DialogsComponent } from '../lista/conteudo/dialogs/dialogs.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, AppMaterialModule, ErrorDialogComponent, DialogsComponent
  ]
})
export class SharedModule { }
