import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../models/usuario.model';
import { AppState } from '../store/app-state';

import * as fromUsuariosAction from '../store/usuarios/usuarios.actions';
import * as fromUsuariosSelectors from '../store/usuarios/usuarios.reducer';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss']
})
export class ListarUsuariosComponent implements OnInit {



  constructor(
    private store: Store<AppState>
  ) { }

  listaUsuarios$: Observable<UsuarioModel[]> = this.store.select(fromUsuariosSelectors.getUsuarios);
  usuario$: Observable<UsuarioModel | null> = this.store.select(fromUsuariosSelectors.getUsuario);

  ngOnInit(): void {
    this.store.dispatch(fromUsuariosAction.LoadUsuarios());
  }

  editar(id: number) {
    this.store.dispatch(fromUsuariosAction.LoadUsuario({ payload: id }));
  }
  exluir(id: number) {
    this.store.dispatch(fromUsuariosAction.DeleteUsuario({payload: id}));
    }
}
