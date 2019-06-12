import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hello World';
  ultimaSoma = ``
  ultimaSubtracao = ``
  ultimaMultiplicacao = ``
  ultimaDivisao = ``

  onChange = (event) => {
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
