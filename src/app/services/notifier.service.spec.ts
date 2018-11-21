import { TestBed, inject } from '@angular/core/testing';
import { NotifierService } from './notifier.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SESSION_STORAGE } from 'angular-webstorage-service';
import { of } from 'rxjs';

describe( 'Prueba sobre componente de servicio - NotifierService', () => {
    let _notifierService: NotifierService;

    beforeEach( () => {
        TestBed.configureTestingModule({
            providers: [
                NotifierService,
                { provide: SESSION_STORAGE, useValue: {} }
            ],
            imports: [
                HttpClientTestingModule,
            ],
        });

        // _notifierService = TestBed.get(NotifierService);
    
    });
    
    beforeEach( inject([NotifierService], (notifierService: NotifierService) => {
        _notifierService = notifierService;
    }));

    it('Creando instancia del servicio', () => {
        expect( _notifierService ).toBeTruthy();
    });

    describe(' Ejecutando el método de postAuthenticate ', () => {

        /*
        * Realización incorrecta. 
        */
        it(' Solicitud de login incorrecto ', () => {
            const messagesResponse = {
                    status: 'Error',
                    message: 'Credenciales invalidas'
                };
            const usuario = 'pe';
            const password = '1';
            let response;
    
            spyOn( _notifierService, 'postAuthenticate' ).and.returnValue(of( messagesResponse ));
            
            _notifierService.postAuthenticate(usuario, password ).subscribe( res => {
                response = res;
            });         
            
            expect( response ).toBe( messagesResponse );
        });

        /*
        * Realización correcta. 
        */
        it(' Solicitud de login correcto ', () => {
            const messagesResponse = {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlcGl0byIsImVtYWlsIjoicGVwaXRvQHBlcGUuY29tIiwiaWF0IjoxNTQyNzc1ODg0LCJleHAiOjE1NDI3NzY0ODR9.rGRBOx4HYXrTkKm6kbyG98allyXklYKsbIEzHLUTFkU',
                users: ['pepito', 'juan carlos', 'edu']
                };
            const usuario = 'pepito';
            const password = '123456';
            let response;

            spyOn( _notifierService, 'postAuthenticate' ).and.returnValue(of( messagesResponse ));
            
            _notifierService.postAuthenticate(usuario, password ).subscribe( res => {
                response = res;
            });
            expect( response ).toBe( messagesResponse );
        });

    });

    /*
    * Metodo para cambiar estado de leido o no el mensaje.
    */
    describe(' Ejecutando el método putMessages ', () => {
        /*
        * Realización correcta. 
        */
        it(' Envio de mensaje correcto ', () => {
            const idxCorrectMessage = '18';
            const messagesResponse = [
                {
                    status: 'Ok',
                    message: 'Se ha modificado correctamente'
                }];
            
            let response;

            spyOn( _notifierService, 'putMessages' ).and.returnValue(of( messagesResponse ));
            
            _notifierService.putMessages(idxCorrectMessage, true ).subscribe( res => {
                response = res;
            });
            expect( response ).toBe( messagesResponse );
        });

        /*
        * Ejecutando el método con id de mensaje erroneo.
        */
        it(' Envio de mensaje con id erroneo ', () => {
            const idxCorrectMessage = '18x00';
            const messagesResponse = [
                {
                    status: 'Error',
                    message: 'No se encontró el mensaje'
                }];
            
            let response;

            spyOn( _notifierService, 'putMessages' ).and.returnValue(of( messagesResponse ));
            
            _notifierService.putMessages(idxCorrectMessage, true ).subscribe( res => {
                response = res;
            });
            expect( response ).toBe( messagesResponse );
        });


    });


    describe(' Ejecutando el método postMessages ', () => {
        /*
        * Realización correcta. 
        */
        it(' Envio de mensaje correcto ', () => {
            const messagesResponse = { mensaje: 'Mensaje posteado con exito' };
            const mensaje = 'Hola a todos los invito a mi cumple.';
            const destinatarios = ['{ "username": "pepito" }, { "username": "Jaime" }, { "username": "Fiorella" }'];
            let response;

            spyOn( _notifierService, 'postMessages' ).and.returnValue(of( messagesResponse ));
            
            _notifierService.postMessages(mensaje, destinatarios ).subscribe( res => {
                response = res;
            });

            expect( response ).toBe( messagesResponse );
        });

        /*
        * Ejecutando el método con id de mensaje erroneo.
        */
        it(' Envio de mensaje con id erroneo ', () => {
            const messagesResponse = [
                {
                    status: 'Error',
                    message: 'Request invalido'
                }];
            const mensaje = 'Hola a todos los invito a mi cumple.';
            const destinatarios = ['{ "usernameeeeee": "pepito" }, { "username": "Jaime" }, { "username": "Fiorella" }'];
            let response;

            spyOn( _notifierService, 'postMessages' ).and.returnValue(of( messagesResponse ));
            
            _notifierService.postMessages(mensaje, destinatarios ).subscribe( res => {
                response = res;
            });

            expect( response ).toBe( messagesResponse );
        });

    });

});
