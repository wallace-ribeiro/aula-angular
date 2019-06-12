import { Component } from '@angular/core';
import { CoisasService } from './coisas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [CoisasService] 
})
export class AppComponent {
  constructor(private coisasService : CoisasService){}
  title = 'Hello World';
  ultimaSoma = ``
  ultimaSubtracao = ``
  ultimaMultiplicacao = ``
  ultimaDivisao = ``
  
  

  onChange = (event) => {
      this.coisasService.getCoisas().subscribe(
          data => console.log('data: ',data),
          error => alert(error),
          () => console.log("acesso a webapi get ok...")
       );
      if(event.fonte == `soma`) {
          this.ultimaSoma = event.resultado
      } else if(event.fonte == `subtracao`) {
          this.ultimaSubtracao = event.resultado
      } else if(event.fonte == `multiplicacao`) {
          this.ultimaMultiplicacao = event.resultado
      } else if(event.fonte == `divisao`) {
          this.ultimaDivisao = event.resultado
      }
  }
}
