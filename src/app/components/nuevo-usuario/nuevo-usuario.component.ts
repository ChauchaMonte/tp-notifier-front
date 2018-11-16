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

  constructor( private _notifierService: NotifierService,
               private _router: Router
               ) { }

  ngOnInit() {
  }

  realizarAltaDeUsuario( nombre: string, password: string, email: string ) {
      
    this._notifierService.postUsers( nombre, password, email )
      .subscribe( ( data ) => {
        this._router.navigate(['/login']);

      }, ( errorServices ) => {
          
        console.log( errorServices );
          
      } );
  
  }

}
