import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'multiplicacao',
  template: `<div>Multiplicacao<div>
  <p><input [(ngModel)]="operator1" type="text" />*<input [(ngModel)]="operator2" type="text" />={{resultado}}</p><p>
  <button (click)="calculate()">Calcular</button></p></div>
  </div>`,
})
export class MultiplicacaoComponent {
  @Input() operator1;
  @Input() operator2;
  @Output() notifyParent = new EventEmitter();
  resultado = 0;
  calculate = () => {
      this.resultado = Number(this.operator1) * Number(this.operator2);
      this.notifyParent.emit({resultado: this.resultado, fonte: `multiplicacao`});
  }
}
