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


  constructor( private _notifierServices: NotifierService,
               private _router: Router,
               ) {

    this.setUsuario( this._notifierServices.getUsers() );
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

  setUsuario( p_users: any[] ) {

    for (let index = 0; index < p_users.length; index++) {

      this.usuarios.push( { 'index': index,
                         'nombre': p_users[index],
                         'seleccionado': false,
                         'estado': true
                        });

    }
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

        console.log( errorServicio );

      });

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
