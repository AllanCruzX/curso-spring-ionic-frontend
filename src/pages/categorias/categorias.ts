import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
     // Estamos chamando a função findAll() criada anteriormente e deixamos um subscribe ali, ou seja, assim que a nossa resposta vier e for transformada em JSON, seremos notificados e o array  receberá a lista de categorias, ou caso seja um erro, tratamos o erro onde deixei um comentário. 
    this.categoriaService.findAll()
    .subscribe(response => {
      //aerofunction uma função dentro de uma função.
      //subscribe você precisa se increver para obter a reposta
      this.items = response;
      console.log(response);
     
    },
    error => {
     
      
    });
        
  }

  showProdutos() {
    this.navCtrl.push('ProdutosPage');    
  }

}
