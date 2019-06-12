import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SomaComponent } from './soma.component';
import { SubtracaoComponent } from './subtracao.component';
import { MultiplicacaoComponent } from './multiplicacao.component';
import { DivisaoComponent } from './divisao.component';
import { ComponenteNovo } from './componente-novo/componente-novo.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponenteNovo,
    SomaComponent,
    SubtracaoComponent,
    MultiplicacaoComponent,
    DivisaoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
