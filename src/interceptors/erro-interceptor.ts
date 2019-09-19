import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { FieldMessage } from '../models/fieldmessage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService , public alertCtrl: AlertController){

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

                case 401:
                    this.handle401();
                    break;

                case 403:
                this.handle403();
                break;

                case 422:
                    this.handle422(errorObj);
                 break;

                default:
                this.handleDefaultEror(errorObj);
            }

            return Observable.throw(errorObj);
        }) as any;
    }


    handle403(){
       this.storage.setLocalUser(null);
       //Staus 403 - Esse status HTTP significa que a URL acessada é considerada proibida para o usuário que está acessando nesse caso rejeitado a conexão para esse usuário.
   }

   handle401() {
       //401 senha ou login incorreto 
    let alert = this.alertCtrl.create({
        title: 'Erro 401: falha de autenticação',
        message: 'Email ou senha incorretos',
        enableBackdropDismiss: false,
        buttons: [
            {
                text: 'Ok'
            }
        ]
    });
    alert.present();
}

handle422(errorObj) {

    console.log(errorObj);
    //422 - erros de validaçãoes vindo do backend.
    let alert = this.alertCtrl.create({
        title: 'Erro 422: Validação',
        message: this.listErrors(errorObj.errors),//errors -nome da lista do back-endo do FieldMessage 
        enableBackdropDismiss: false,
        buttons: [
            {
                text: 'Ok'
            }
        ]
    });
    alert.present();
}

private listErrors(messages : FieldMessage[]) : string {
    //listar cada um dos erros.
    let s : string = '';
    for (var i=0; i<messages.length; i++) {
        s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
    }
    return s;
}


   handleDefaultEror(errorObj) {
    let alert = this.alertCtrl.create({
        title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
        message: errorObj.message,
        enableBackdropDismiss: false,
        buttons: [
            {
                text: 'Ok'
            }
        ]
    });
    alert.present();        
}

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};