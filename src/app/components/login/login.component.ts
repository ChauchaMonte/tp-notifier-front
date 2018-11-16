import { Component } from '@angular/core';
import { NotifierService } from 'src/app/services/notifier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  date = '2018-11-06T20:22:20.071Z';

  constructor( private _notifierServices: NotifierService,
               private _router: Router
    ) {}


  login( user: string, password: any ) {

    this._notifierServices.postAuthenticate(user, password)
      .subscribe( ( data: any ) => {

        this._notifierServices.updateToken( data.token );
        this._notifierServices.setUsers( data.users );

        this._router.navigate(['/principalPage']);

      }, ( errorServicio ) => {

        console.log(errorServicio);

      });
  }
}
