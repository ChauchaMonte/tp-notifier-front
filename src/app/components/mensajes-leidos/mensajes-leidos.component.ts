import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'src/app/services/notifier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensajes-leidos',
  templateUrl: './mensajes-leidos.component.html'
})
export class MensajesLeidosComponent implements OnInit {

  mensajes = [];
  objectKeys = Object.keys;

  constructor( private _notifierServices: NotifierService,
               private _router: Router

  ) { }

  ngOnInit() {
    this._notifierServices.getMessages()
        .subscribe( (data: any) => {

          for (let index = 0; index < data.mensajesRecibidos.length; index++) {

            this.mensajes.push({
              'enviado': data.mensajesRecibidos[index].enviado,
              'leido': data.mensajesRecibidos[index].leido,
              'mensaje': data.mensajesRecibidos[index].mensaje,
              'remitente': data.mensajesRecibidos[index].remitente,
              'idMensaje': index
            });
          }

          console.log('----mensajes-----');
          console.log( this.mensajes );
          console.log('---------');

        }, ( errorServices ) => {

          this._router.navigate(['/home']);

        });
  }

}
