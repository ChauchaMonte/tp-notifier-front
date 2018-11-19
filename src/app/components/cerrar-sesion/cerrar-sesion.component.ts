import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'src/app/services/notifier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html'
})
export class CerrarSesionComponent implements OnInit {

  constructor( private _notifierServices: NotifierService,
               private _router: Router
  ) { }

  ngOnInit() {

    this._notifierServices.putStatus( false )
      .subscribe( ( dataStatus: any ) => { 
        
        console.log( dataStatus );
        
        this._notifierServices.updateToken(' ');

        this._router.navigate([ '/login' ]);

      }, ( errorStatus ) => {

        console.log( errorStatus );

      });
  }

}
