import { UsuarioModel } from "../models/usuario.model";
import{ HttpClient, HttpHeaders } from '@angular/common/http';
import {  Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class UsuarioService{
    constructor(private http: HttpClient){}
    getUsuarios(){
        return this.http.get<UsuarioModel[]>('http://localhost:3000/Usuarios');
    }
    getUsuarioByID(id:number){
        return this.http.get<UsuarioModel>('http://localhost:3000/Usuarios/'+id);
    }
    addUsuario(usuario: UsuarioModel){
        let headers = new HttpHeaders();
        headers.set('Content-Type','application/json; chaset=utf-8')
        return this.http.post<UsuarioModel>('http://localhost:3000/Usuarios',usuario,{ headers: headers});
    }
    updateUsuario(usuario: UsuarioModel){
        let headers = new HttpHeaders();
        headers.set('Content-Type','application/json; chaset=utf-8')
        return this.http.put<UsuarioModel>('http://localhost:3000/Usuarios/'+usuario.id,usuario,{ headers: headers});
    }
    deleteUsuario(id: number){
        let headers = new HttpHeaders();
        headers.set('Content-Type','application/json; chaset=utf-8')
        return this.http.delete('http://localhost:3000/Usuarios/'+id,{ headers: headers});
    }
}