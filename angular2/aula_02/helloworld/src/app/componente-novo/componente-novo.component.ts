import { Component } from '@angular/core';

@Component({
    selector: 'componente-novo',
    template: '<p>{{name}}<p>'
})
export class ComponenteNovo {
    name = 'Componente personalizado'
}

