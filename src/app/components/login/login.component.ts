import { Component } from '@angular/core';
import { NotifierService } from 'src/app/services/notifier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  mensaje: string;
  viewAlert = false;
  constructor( private _notifierServices: NotifierService,
               private _router: Router
    ) {}


  login( user: string, password: any ) {

    this._notifierServices.postAuthenticate(user, password)
      .subscribe( ( data: any ) => {

        this._notifierServices.updateToken( data.token );
        this._notifierServices.putStatus( true )
          .subscribe( ( dataStatus: any ) => { 
            
            console.log( dataStatus );

            this._router.navigate(['/principalPage']);
          }, ( errorStatus ) => {
            
            console.log( errorStatus );

          });

      }, ( errorServicio ) => {
    
        this.mensaje = errorServicio.error.message;
        this.viewAlert = true;
        
        setTimeout ( () => { this.viewAlert = false; } , 1000 );

      });
  }
}
