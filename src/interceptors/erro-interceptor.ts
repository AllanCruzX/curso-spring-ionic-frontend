import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService){

    }

    //Interceptor : Interceptar todas as solicitações HTTP de uma maneira mais fácil e alterá-las, adicionando algum cabeçalho personalizado (um costume necessário para quem usa o padrão de autenticação de token da web) e também capturar os erros que ocorrem.

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .catch((error, caught) => {
            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }
            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            switch(errorObj.status) {
                case 403:
                this.handle403();
                break;
            }

            return Observable.throw(errorObj);
        }) as any;
    }


    handle403(){
       this.storage.setLocalUser(null);
       //Staus 403 - Esse status HTTP significa que a URL acessada é considerada proibida para o usuário que está acessando nesse caso rejeitado a conexão para esse usuário.
   }


}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};