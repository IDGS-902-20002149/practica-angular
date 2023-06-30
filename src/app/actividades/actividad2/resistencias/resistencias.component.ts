import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-resistencias',
  templateUrl: './resistencias.component.html',
  styleUrls: ['./resistencias.component.css'],
})
export class ResistenciasComponent {
  banda1!:string
  banda2!:string
  banda3!:string
  b1:string = '0'
  b2:string = '0'
  b3:number = 0
  tolerancia!:string
  res!:number
  min!:number
  max!:number

  colores:string[] = [
    'Black',
    'Brown',
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Blue',
    'Purple',
    'Grey',
    'White',
  ]

  tipoTolerancia:string[] = [
    'Gold',
    'Silver'
  ]

  calcularValor(tole:string){
    this.b1 = this.getValue(this.banda1)
    this.b2 = this.getValue(this.banda2)
    this.b3 = this.getValueB(this.banda3)
    let concat = this.b1 + this.b2
    let tol = 0 

    console.log(tole);

    if (tole == 'Gold'){
      tol = 0.05
    }else {
      tol = 0.1
    }

    this.res = parseInt(concat) * this.b3;

    this.max = this.res + (this.res * tol)

    this.min = this.res - (this.res * tol)
  }

  getValue(banda:string):string{
    switch(banda){
      case 'Black': 
        return '0';
      case 'Brown': 
        return '1';
      case 'Red': 
        return '2';
      case 'Orange': 
        return '3';
      case 'Yellow': 
        return '4';
      case 'Green': 
        return '5';
      case 'Blue': 
        return '6';
      case 'Purple': 
        return '7';
      case 'Grey': 
        return '8';
      case 'White': 
        return '9';
      default:
        return '0'       
    }
    
  }

  getValueB(banda:string):number{
    switch(banda){
      case 'Black': 
        return 1;
      case 'Brown': 
        return 10;
      case 'Red': 
        return 100;
      case 'Orange': 
        return 1000;
      case 'Yellow': 
        return 10000;
      case 'Green': 
        return 100000;
      case 'Blue': 
        return 1000000;
      case 'Purple': 
        return 10000000;
      case 'Grey': 
        return 100000000;
      case 'White': 
        return 1000000000;
      default:
        return 0       
    }
  }
}