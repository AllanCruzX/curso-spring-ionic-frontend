import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';


@IonicPage()//permite eu referenciar a classe por String exemplo: "HomePage".
@Component({
  //decorator : É um padrão de projeto de software que permite adicionar um comportamento a um objeto já existente em tempo de execução, ou seja, agrega dinamicamente responsabilidades adicionais a um objeto.
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  public login(){
    this.navCtrl.setRoot('CategoriasPage');
        //push empilha as paginas - this.navCtrl.push('CategoriasPage');
  }

}
