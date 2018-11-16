import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  @Input() mensaje: any;
  @Output() quitarMensaje: EventEmitter<string>;


  constructor( private _notifierServices: NotifierService ) {

    this.quitarMensaje = new EventEmitter;

  }

  ngOnInit() {

  }

  mensajeLeido() {
    this._notifierServices.putMessages( this.mensaje.idMensaje, true )
    .subscribe( ( data ) => {
      console.log( data );

      this.quitarMensaje.emit( this.mensaje.idMensaje );


    },  ( errorServices ) => {
      console.log( errorServices );

    });

  }


}
