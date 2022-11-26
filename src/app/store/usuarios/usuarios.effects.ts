import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { UsuarioService } from "src/app/repositories/usuario.service";
import * as fromUsuariosAction from "./usuarios.actions";

@Injectable()
export class UsuariosEffects {
    constructor(private actions$: Actions, private usuariosService: UsuarioService) {

    }

    loadUsuarios$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromUsuariosAction.usuariosTypeAction.LOAD_USUARIOS),
            mergeMap(() => this.usuariosService.getUsuarios()
                .pipe(
                    map(usuarios => fromUsuariosAction.LoadUsuariosSuccess({ payload: usuarios })),
                    catchError((e) => of(fromUsuariosAction.LoadUsuariosFail({ error: e })))
                ))
        ));

        loadUsuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromUsuariosAction.usuariosTypeAction.LOAD_USUARIO),
            mergeMap((record: any) => this.usuariosService.getUsuarioByID(record.payload)
                .pipe(
                    map(usuario => fromUsuariosAction.LoadUsuarioSuccess({ payload: usuario })),
                    catchError((e) => of(fromUsuariosAction.LoadUsuarioFail({ error: e })))
                ))
        ));

        createUsuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromUsuariosAction.usuariosTypeAction.CREATE_USUARIO),
            mergeMap((record: any) => this.usuariosService.addUsuario(record.payload)
                .pipe(
                    map(usuario => fromUsuariosAction.CreateUsuarioSuccess({ payload: usuario })),
                    catchError((e) => of(fromUsuariosAction.CreateUsuarioFail({ error: e })))
                ))
        ));

        updateUsuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromUsuariosAction.usuariosTypeAction.UPDATE_USUARIO),
            mergeMap((record: any) => this.usuariosService.updateUsuario(record.payload)
                .pipe(
                    map(usuario => fromUsuariosAction.UpdateUsuarioSuccess({ payload: usuario })),
                    catchError((e) => of(fromUsuariosAction.UpdateUsuarioFail({ error: e })))
                ))
        ));

        deleteUsuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromUsuariosAction.usuariosTypeAction.DELETE_USUARIO),
            mergeMap((record: any) => this.usuariosService.deleteUsuario(record.payload)
                .pipe(
                    map(_  => fromUsuariosAction.DeleteUsuarioSuccess({ payload: record.payload })),
                    catchError((e) => of(fromUsuariosAction.DeleteUsuarioFail({ error: e })))
                ))
        ));

}