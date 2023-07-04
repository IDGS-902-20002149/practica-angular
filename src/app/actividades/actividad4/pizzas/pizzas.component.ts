import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import Swal from 'sweetalert2';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

export interface Ingredientes {
  jamon: boolean;
  pina: boolean;
  champinon: boolean;
}

export interface listPizzas {
  size: string;
  position: number;
  numPizzas: number;
  ingredients: Ingredientes;
  subtotal: number;
}

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css'],
})
export class PizzasComponent {
  nombre!: string;
  direccion!: string;
  telefono!: string;
  v_nombre!: string;
  v_direccion!: string;
  v_telefono!: string;
  numPizzas!: number;
  tampizza!: string;
  contador: number = 1;
  mensaje!: string;
  total: number = 0;
  formattedDate!: string;
  total_dia:number = 0;
  displayedColumns: string[] = [
    'Num. Pedido',
    'Tamaño',
    'Ingredientes',
    'Subtotal',
  ];
  tamPizza: string[] = ['Chica', 'Mediana', 'Grande'];

  task: Task = {
    name: 'Seleccionar todos',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Jamon', completed: false, color: 'primary' },
      { name: 'Pina', completed: false, color: 'accent' },
      { name: 'Champinon', completed: false, color: 'warn' },
    ],
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete =
      this.task.subtasks != null &&
      this.task.subtasks.every((t) => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return (
      this.task.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach((t) => (t.completed = completed));
  }

  pizzas: listPizzas[] = [];

  guardarPizza() {
    this.v_nombre! = this.nombre;
    this.v_direccion! = this.direccion;
    this.v_telefono! = this.telefono;

    let ingredientsArray = this.getIngredients();

    let newPizza: listPizzas = {
      size: this.tampizza,
      position: this.contador,
      numPizzas: this.numPizzas,
      ingredients: {
        jamon: ingredientsArray[0],
        pina: ingredientsArray[1],
        champinon: ingredientsArray[2],
      },
      subtotal: 0,
    };

    this.pizzas.push(newPizza);

    this.calcularSubtotalLista();

    this.mensaje = 'El total del pedido es: $' + this.total;

    let currentDate = new Date();

    let day = String(currentDate.getDate()).padStart(2, '0');
    let month = String(currentDate.getMonth() + 1).padStart(2, '0');
    let year = String(currentDate.getFullYear());

    this.formattedDate = `${day}-${month}-${year}`;

    this.contador += 1;
  }

  getIngredients(): boolean[] {
    let listIngredient: boolean[] = [];
    for (let ingredient of this.task.subtasks!) {
      listIngredient.push(ingredient.completed);
    }
    return listIngredient;
  }

  calcularSubtotalLista() {
    let preciopizza: number = 0;
    this.total = 0;
    for (let i = 0; i < this.pizzas.length; i++) {
      let extra: number = 0;
      if (this.pizzas[i].size == 'Chica') {
        preciopizza = 40;
      }
      if (this.pizzas[i].size == 'Mediana') {
        preciopizza = 80;
      }
      if (this.pizzas[i].size == 'Grande') {
        preciopizza = 120;
      }
      if (this.pizzas[i].ingredients.champinon) {
        extra += 10;
      }
      if (this.pizzas[i].ingredients.jamon) {
        extra += 10;
      }
      if (this.pizzas[i].ingredients.pina) {
        extra += 10;
      }

      this.pizzas[i].subtotal =
        (preciopizza + extra) * this.pizzas[i].numPizzas;
      this.total += this.pizzas[i].subtotal;
    }
  }

  eliminarPizza(position: number) {
    let index = this.pizzas.findIndex((item) => item.position === position);
    if (index !== -1) {
      this.pizzas.splice(index, 1);
      this.calcularSubtotalLista();
      this.mensaje = 'El total del pedido es: $' + this.total;
    }
  }

  finalizarPedido() {
    Swal.fire({
      title: 'Estas de acuerdo con el monto?',
      text: "No podras hacer cambios despues!!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy de acuerdo!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Pedido realizado!', 'Tu pedido se ha realizado correctamente.', 'success');
        this.total_dia += this.total; 
        while (this.pizzas.length > 0) {
          this.pizzas.splice(0, 1);
        }
        this.v_nombre! = '';
        this.v_direccion! = '';
        this.v_telefono! = '';
        this.nombre! = '';
        this.direccion! = '';
        this.telefono! = '';
        this.total = 0;
        this.mensaje = '';
        this.formattedDate = '';
      }
    });
    
  }
}
