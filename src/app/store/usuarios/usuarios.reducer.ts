import { Action, createFeatureSelector, createReducer, createSelector, createSelectorFactory, on } from "@ngrx/store";
import { UsuarioModel } from "src/app/models/usuario.model";
import * as fromUsuariosAction from '../usuarios/usuarios.actions';

export interface UsuariosState{
    usuarios: UsuarioModel[];
    usuario: UsuarioModel | null;
    error: string | '';
}

export const initialState: UsuariosState = {
    usuarios: [],
    usuario:  null,
    error: ''
}

const _usuariosReducer= createReducer(
    initialState,
    on(fromUsuariosAction.LoadUsuariosSuccess,(state, { payload }) => ({ ...state, usuarios: payload, error: ''})),
    on(fromUsuariosAction.LoadUsuariosFail,(state, { error }) => ({ ...state,  error})),

    on(fromUsuariosAction.LoadUsuarioSuccess,(state, { payload }) => ({ ...state, usuario: payload, error: ''})),
    on(fromUsuariosAction.LoadUsuarioFail,(state, { error }) => ({ ...state,  error})),

    on(fromUsuariosAction.CreateUsuarioSuccess,(state, { payload }) => ({ ...state, usuarios: [...state.usuarios, payload], error: ''})),
    on(fromUsuariosAction.CreateUsuarioFail,(state, { error }) => ({ ...state,  error})),

    on(fromUsuariosAction.UpdateUsuarioSuccess,(state, { payload }) => ({ ...state, usuarios: [...state.usuarios].map((row)=>{
        if(row.id == payload.id){
            return payload;
        }
        return row;
    }), error: ''})),
    on(fromUsuariosAction.UpdateUsuarioFail,(state, { error }) => ({ ...state,  error})),

    on(fromUsuariosAction.DeleteUsuarioSuccess,(state, { payload }) => ({ ...state, usuarios: [...state.usuarios].filter((row)=> row.id != payload), error: ''})),
    on(fromUsuariosAction.DeleteUsuarioFail,(state, { error }) => ({ ...state,  error})),
)


export function usuariosReducer(state = initialState, action: Action){
    return _usuariosReducer(state,action);
}

const getUsuariosFeatureState = createFeatureSelector<UsuariosState>('usuarios');

export const getUsuarios = createSelector(
    getUsuariosFeatureState,
    (state: UsuariosState) => state.usuarios
)

export const getUsuario = createSelector(
    getUsuariosFeatureState,
    (state: UsuariosState) => state.usuario
)

export const getUsuarioError = createSelector(
    getUsuariosFeatureState,
    (state: UsuariosState) => state.error
)

export const getUsuariosAdministradores = createSelector(
    getUsuariosFeatureState,
    (state: UsuariosState) => state.usuarios.filter((u)=> u.perfil == 'Administrador')
)
