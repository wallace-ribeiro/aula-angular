import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  receiverTitulo = (tituloNovo) => {
    console.log('Foi emitido o evento e chegou no pai >>>> ', tituloNovo);
    this.title = tituloNovo.title;
  }
}
