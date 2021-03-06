import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaService } from '../services/domain/categoria.service';
import {  ErrorInterceptorProvider } from '../interceptors/erro-interceptor';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ClienteService } from '../services/domain/cliente.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { ProdutoService } from '../services/domain/produto.service';
import { CartService } from '../services/domain/cart.service';
import { ImageUtilService } from '../services/image-util.service';

@NgModule({
  declarations: [
    MyApp
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    ClienteService,
    ProdutoService,
    CartService,
    ImageUtilService

  ]
})
export class AppModule {
//Modulo principal da aplicação
//O IonicModule é um NgModule que inicializa um aplicativo Ionic. Ao passar um componente raiz, o IonicModule garantirá que todos os componentes, diretivas e provedores da estrutura sejam importados.
//Qualquer configuração para o aplicativo pode ser passada como o segundo argumento para forRoot. Pode ser qualquer propriedade válida do Config .

//Diretivas: Controla o Two Way Data Binding da paginas . Exemplo: ng-if , ng-view , ng-app	e etc ... 

//Provedores: Prover serviços são funções . "Você deve usar a receita do Provider apenas quando deseja expor uma API para configurações que precisam ser feitas antes da inicialização da aplicação. Comumente isto é interessante apenas para serviços reutilizáveis cujo comportamento precise variar ligeiramente entre aplicações." (tradução livre)
//*Provider é uma das receitas angular;
//*Provider é a receita básica do angular, mãe de todas as outras;
//*Um provider implementa um método $get que retorna uma Factory;
//*Se você não declarar um provider para sua factory o angular irá fazer isso por conta própria debaixo dos panos;
//*Um módulo angular possui fases, e a fase de configuração é acessível via função config();
//*Na função config() os factory ainda não existem, apenas os provider;
//*Na fase de run() os provider já não estão mais disponíveis;
//*Por isso usa-se um provider quando se quer que uma factory angular possa ser configurada de modos diferentes em aplicações diferentes;

//Módulo é a parte do sistema responsável por uma tarefa bem definida e que pode ser acoplado a um sistema para permitir ao mesmo executar a tarefa disponibilizada pelo módulo.

}
