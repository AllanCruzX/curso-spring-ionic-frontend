import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';


@IonicPage()//permite eu referenciar a classe por String exemplo: "HomePage".
@Component({
  //decorator : É um padrão de projeto de software que permite adicionar um comportamento a um objeto já existente em tempo de execução, ou seja, agrega dinamicamente responsabilidades adicionais a um objeto.
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email : "",
    senha : ""
  };

  constructor(public navCtrl: NavController , public menu: MenuController , public auth: AuthService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
    }
    
    ionViewDidLeave() {
    this.menu.swipeEnable(true);
    }

  public login(){

    this.auth.authenticate(this.creds)
    .subscribe(response => {
        console.log(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
        //push empilha as paginas - this.navCtrl.push('CategoriasPage');

    },
      error => {})
   
    
   
  }

  

}
