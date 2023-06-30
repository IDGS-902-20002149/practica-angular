import { Component } from '@angular/core';

@Component({
  selector: 'app-cinepolis',
  templateUrl: './cinepolis.component.html',
  styleUrls: ['./cinepolis.component.css']
})
export class CinepolisComponent {
  nombre!:string
  numClientes!:number
  numBoletos!:number
  trjCineco!:string
  respuesta!:string

  opcsCineco:string[] = [
    'Si',
    'No'
  ]

  calcularCosto(trj:string){
    let total = 0;
    let desc = 1;
    let descTrj = 1;

    if(this.numBoletos <= (this.numClientes*7) && this.numBoletos > 0){
      if(this.numBoletos > 5)
        desc = 0.85;
      else if(this.numBoletos<= 5 && this.numBoletos>=3)
        desc = 0.9;

      if(trj == 'Si')
        descTrj = 0.9;
      
      total = this.numBoletos * 12 * desc * descTrj

      const formattedTotal = total.toLocaleString('es', {
        style: 'currency',
        currency: 'MXN'
      });
    
      this.respuesta = 'Estimado/a ' + this.nombre + ' el total a pagar es de: ' + formattedTotal;
    } else {
      this.respuesta = 'Estimado/a ' + this.nombre + ' solo es posible comprar hasta 7 boletos por persona';
    }
  }
}
