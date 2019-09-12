import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CategoriaDTO } from "../../models/categoria.dto";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class CategoriaService{

    constructor(public http: HttpClient){
        //HttpClient retorna objetos observáveis."Enviar dados para o servidor e podemos acessar o status da resposta".
    }

    findAll() : Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]> (`${API_CONFIG.baseUrl}/categorias`);
        //Uma chamada http ela é assicrona é uma chamada ajax.
        //Observable por definição é uma coleção que funciona de forma unidirecional, ou seja, ele emite notificações sempre que ocorre uma mudança em um de seus itens e a partir disto podemos executar uma ação.
      
    }

}