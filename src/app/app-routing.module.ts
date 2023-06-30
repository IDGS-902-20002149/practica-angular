import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistanciaComponent } from './actividades/actividad1/distancia/distancia.component';
import { ResistenciasComponent } from './actividades/actividad2/resistencias/resistencias.component';
import { CinepolisComponent } from './actividades/actividad3/cinepolis/cinepolis.component';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'Actividad1', component: DistanciaComponent},
  {path:'Actividad2', component: ResistenciasComponent},
  {path:'Actividad3', component: CinepolisComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
