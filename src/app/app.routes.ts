import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrincipalPageComponent } from './components/principal-page/principal-page.component';
import { CerrarSesionComponent } from './components/cerrar-sesion/cerrar-sesion.component';
import { MensajesLeidosComponent } from './components/mensajes-leidos/mensajes-leidos.component';
import { NuevoUsuarioComponent } from './components/nuevo-usuario/nuevo-usuario.component';


export const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'principalPage', component: PrincipalPageComponent },
    { path: 'cerrarSesion', component: CerrarSesionComponent },
    { path: 'mensajesLeidos', component: MensajesLeidosComponent },
    { path: 'nuevoUsuario', component: NuevoUsuarioComponent },
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }
];
