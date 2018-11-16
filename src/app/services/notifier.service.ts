import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

const STORAGE_TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  headers: HttpHeaders;
  url = 'http://localhost:8080/';
  token: any = '';
  users: any[] = [];

  constructor( private http: HttpClient,
        @Inject(SESSION_STORAGE) private storage: StorageService
    ) {

      console.log('Servicio listo para usar');

  }

  getHeader(): HttpHeaders {

    if (this.headers) {
      console.log(' no genero el header de nuevo. ');

      return this.headers;

    } else {

      console.log(' si genero el header. ');

      if (this.storage.get(STORAGE_TOKEN) === null ) {

        this.storage.set(STORAGE_TOKEN, ' empty ');

      }

      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.storage.get(STORAGE_TOKEN)
      });

      return this.headers;
    }
  }

  // OK
  getMessages() {

    const headers = this.getHeader();

    return this.http.get(`${ this.url }messages/`, { headers });
  }

  // OK
  postMessages(mensaje: string, destinatarios: string[]) {

    // const msj = ` { "mensaje": "Hola a todos los invito a mi cumple.", "destinatarios": [ { "username": "pepito" }, { "username": "Jaime" }, { "username": "Fiorella" } ]} `;
    const msj = ` { "mensaje": " ${ mensaje } " , "destinatarios": [ ${ destinatarios } ]} `;
    const headers = this.getHeader();

    return this.http.post(`${ this.url }messages/`, msj , { headers });
  }

  // OK
  putMessages(idxMensaje: string, estado: boolean) {

    // const msj = { "idxMensaje": "1" , "leido": "true" }
    const msj = ` { "idxMensaje": " ${ idxMensaje } " , "leido": "${ estado } " } `;
    const headers = this.getHeader();

    return this.http.put(`${ this.url }messages/`, msj , { headers });
  }

  postUsers(nombre: string, password: string, email: string) {

    // const msj = ' { "username": "pepito2", "password": "123456", "email": "pepito@pepe.com" } ';
    const msj = ` { "username": "${ nombre }", "password": "${ password }", "email": "${ email }" } `;
    const headers = this.getHeader();

    return this.http.post(`${ this.url }users/`, msj , { headers });
  }

  // OK
  postAuthenticate(usuario: string, password: any) {

    const msj = `{ "username": "${ usuario }", "password": "${ password }" } `;
    const headers = this.getHeader();

    return this.http.post(`${ this.url }authenticate/`, msj , { headers });

  }

  updateToken( token: any) {
    console.log('Actualizo el token');
    this.storage.set(STORAGE_TOKEN, token);
    this.headers = null;
  }

  setUsers( usuario ) {
    this.users = usuario;
  }

  getUsers() {
    return this.users;
  }

  logOff() {
    this.updateToken(' ');
    this.setUsers( [] );
  }
}