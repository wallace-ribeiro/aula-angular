import { Component,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'divisao',
  template: `<div>Divisao<div>
  <p><input [(ngModel)]="dividendo" type="text" />/<input [(ngModel)]="divisor" type="text" />={{resultado}}</p><p>
  <button (click)="calculate()">Calcular</button></p></div>
  </div>`,
})
export class DivisaoComponent {
  @Input() dividendo;
  @Input() divisor;
  @Output() notifyParent = new EventEmitter();
  resultado = 0;
  calculate = () => {
      this.resultado = Number(this.dividendo) / Number(this.divisor);
      this.notifyParent.emit({resultado: this.resultado, fonte: `divisao`});
  }
}
