import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'src/app/services/notifier.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styles: [`
  .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }`]
})
export class NuevoUsuarioComponent implements OnInit {


  nombre: string = '';
  password: string = '';
  email: string = '';
  
  mensajeAlerta: string;
  viewAlert = false;

  constructor( private _notifierService: NotifierService,
               private _router: Router
               ) { }

  ngOnInit() {
  }

  realizarAltaDeUsuario( nombre: string, password: string, email: string ) {
      
    this._notifierService.postUsers( nombre, password, email )
      .subscribe( ( data ) => {
        this._router.navigate(['/login']);

      }, ( errorServicio ) => {

        this.mensajeAlerta = errorServicio.error.message;
        this.viewAlert = true;
        
        setTimeout ( () => { this.viewAlert = false; } , 1000 );
          
        console.log( errorServicio );
          
      } );
  
  }

}
