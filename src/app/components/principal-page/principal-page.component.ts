import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'src/app/services/notifier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal-page',
  templateUrl: './principal-page.component.html'
})
export class PrincipalPageComponent implements OnInit {

  usuarios: any[] = [];
  mensajes = [];
  objectKeys = Object.keys;
  viewAlert = false;
  mensajeAlert: string;


  constructor( private _notifierServices: NotifierService,
               private _router: Router,
               ) {

    this.setUsuario();
  }

  ngOnInit() {
    this._notifierServices.getMessages()
        .subscribe( (data: any) => {

          for (let index = 0; index < data.mensajesRecibidos.length; index++) {

            this.mensajes.push({
              'enviado': data.mensajesRecibidos[index].enviado,
              'leido': data.mensajesRecibidos[index].leido,
              'mensaje': data.mensajesRecibidos[index].mensaje,
              'remitente': data.mensajesRecibidos[index].remitente,
              'idMensaje': data.mensajesRecibidos[index].id
            });
          }

          console.log('----mensajes-----');
          console.log( this.mensajes );
          console.log('---------');

        }, ( errorServicio ) => {
          
          this.mensajeAlert = errorServicio.error.message;
          this.viewAlert = true;
          
          setTimeout ( () => { this.viewAlert = false; } , 1000 );

        });
  }

  setUsuario() {

    this._notifierServices.getUsers()
      .subscribe( ( data: any ) => {

        for (let index = 0; index < data.usuarios.length; index++) {

          this.usuarios.push( { 'index': data.usuarios[index]._id,
                             'nombre': data.usuarios[index].username,
                             'seleccionado': false,
                             'estado': data.usuarios[index].status,
                             'email': data.usuarios[index].email
                            });
        }

      }, ( errorServices ) => {

        console.log( errorServices );
        
      });

    console.log('------users---------');
    console.log(this.usuarios);
    console.log('---------------');
  }

  enviarMensaje(cadena: string) {

    if ( this.seleccionoDestinatario() && cadena !== '' ) {

      this._notifierServices.postMessages( cadena, this.getDestinatarios() )
      .subscribe( ( data ) => {

        this.limpiarAlEnviarUnMensaje();

      }, ( errorServicio ) => {

        this.mensajeAlert = errorServicio.error.message;
        this.viewAlert = true;
        
        setTimeout ( () => { this.viewAlert = false; } , 1000 );

      });

    } else {

      this.mensajeAlert = ' Debe seleccionar al menos un destinatario ';
      this.viewAlert = true;
      
      setTimeout ( () => { this.viewAlert = false; } , 1000 );

    }
  }

  seleccionoDestinatario(): boolean {

    for (let index = 0; index < this.usuarios.length; index++) {
      if (this.usuarios[index].seleccionado) {
        return true;
      }
    }
    return false;
  }

  getDestinatarios() {
    let destinatarios: string[] = [];

    for (let index = 0; index < this.usuarios.length; index++) {
      if (this.usuarios[index].seleccionado) {
        destinatarios.push ( '{ "username": "' + this.usuarios[index].nombre + '" }' );
      }
    }
    return destinatarios;
  }

  limpiarAlEnviarUnMensaje() {

    for (let index = 0; index < this.usuarios.length; index++) {
      this.usuarios[index].seleccionado = false;
    }

  }

  quitarMensaje( p_idMensaje ) {

    for (let index = 0; index < this.mensajes.length; index++) {

      if (this.mensajes[index].idMensaje === p_idMensaje) {

        this.mensajes.splice(this.mensajes[index], 1);

      }

    }
  }

  changeStatusCheckbok( p_status: boolean ) {

    for (let index = 0; index < this.usuarios.length; index++) {
      this.usuarios[index].seleccionado = p_status;
    }

  }
}
