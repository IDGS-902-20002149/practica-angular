import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DospuntosModule } from './actividades/actividad1/dospuntos/dospuntos.module';
import { ResistenciasMModule } from './actividades/actividad2/resistencias-m/resistencias-m.module';
import { CineModule } from './actividades/actividad3/cine/cine.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './actividades/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DospuntosModule,
    ResistenciasMModule,
    CineModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
