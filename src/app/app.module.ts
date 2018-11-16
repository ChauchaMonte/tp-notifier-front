import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

// Rutas.
import { APP_ROUTES } from './app.routes';

// Servicio.
import { NotifierService } from './services/notifier.service';
import { StorageServiceModule } from 'angular-webstorage-service';

// Componentes.
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PrincipalPageComponent } from './components/principal-page/principal-page.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CerrarSesionComponent } from './components/cerrar-sesion/cerrar-sesion.component';
import { MensajesLeidosComponent } from './components/mensajes-leidos/mensajes-leidos.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { NuevoUsuarioComponent } from './components/nuevo-usuario/nuevo-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalPageComponent,
    NavbarComponent,
    CerrarSesionComponent,
    MensajesLeidosComponent,
    MensajesComponent,
    NuevoUsuarioComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    StorageServiceModule,
    RouterModule.forRoot( APP_ROUTES, { useHash: true } )
  ],
  providers: [
    NotifierService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
