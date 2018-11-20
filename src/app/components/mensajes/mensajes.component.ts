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

  mensajeAlerta: string;
  viewAlert = false;
  
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


    },  ( errorServicio ) => {
      console.log( errorServicio );

      this.mensajeAlerta = errorServicio.error.message;
      this.viewAlert = true;
      
      setTimeout ( () => { this.viewAlert = false; } , 1000 );

    });

  }


}
