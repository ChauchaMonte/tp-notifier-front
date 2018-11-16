import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'src/app/services/notifier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html'
})
export class CerrarSesionComponent implements OnInit {

  constructor( private _notifierService: NotifierService,
               private _router: Router
  ) { }

  ngOnInit() {
    this._notifierService.logOff();
    this._router.navigate([ '/login' ]);
  }

}
