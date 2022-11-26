import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UsuarioModel } from '../models/usuario.model';
import { UsuarioService } from '../repositories/usuario.service';
import { AppState } from '../store/app-state';
import * as fromUsuariosAction from '../store/usuarios/usuarios.actions';

@Component({
  selector: 'app-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.component.html',
  styleUrls: ['./cadastro-usuarios.component.scss']
})
export class CadastroUsuariosComponent implements OnInit {


  constructor(private store: Store<AppState>, private fb: FormBuilder) { }

  public formCadastro = this.fb.group<UsuarioModel>(
    {
      id: 0,
      nome: '',
      idade: 0,
      perfil: '',
    }
  )

  ngOnInit(): void {
  }

  addUsuario() {
    if (this.formCadastro.valid) {
      if (this.formCadastro.value.id == 0) {
        this.store.dispatch(fromUsuariosAction.CreateUsuario({ payload: this.formCadastro.value as UsuarioModel }));
      } else {
        this.store.dispatch(fromUsuariosAction.UpdateUsuario({ payload: this.formCadastro.value as UsuarioModel }));
      }
    }

  }

}
