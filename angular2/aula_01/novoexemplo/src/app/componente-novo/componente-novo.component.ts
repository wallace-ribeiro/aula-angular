import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'componente-novo',
    template: '<div><p>{{name}}<p><div>Descrito frase que veio do pai é: {{titulo}}</div><input [(ngModel)]="textValue" type="text"><button (click)="onClickMe()">Click me!</button><div><button (click)="changeTitle()">Change Title</button></div></div>'
})
export class ComponenteNovo {
    @Input() titulo;
    @Output() mudarTitulo = new EventEmitter();


    textValue = "";

    name = 'Componente personalizado'
    onClickMe =() => {
        console.log('Clicado: ',this.textValue);
    }

    changeTitle =() => {
        this.mudarTitulo.emit({title: this.textValue});
    }
}

