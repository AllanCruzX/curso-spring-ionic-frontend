import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[] = [];
  // ProdutoDTO[] = [] iniciando uma lista vazio para concatenar a lista (lista vai ser as paginas).
  page : number = 0;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams ,
     public produtoService: ProdutoService,
     public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
  
        let categoria_id = this.navParams.get('categoria_id');
        let loader = this.presentLoading();
        this.produtoService.findByCategoria(categoria_id, this.page, 10)
          .subscribe(response => {
            let start = this.items.length;//o tamanho que a lista tinha antes
            this.items = this.items.concat(response['content']);// response['content'] --content tem o conteudo ( pois o endpoit é pagibado). concat estou concatenado a respota com a que já tinha antes.
            let end = this.items.length - 1; // o novo tamanho da lista -1
            loader.dismiss();
            console.log(this.page);
            console.log(this.items);
            this.loadImageUrls(start, end);
         
      },
      error => {
        loader.dismiss();
      });
    }

    loadImageUrls(start: number, end: number) {
      //metod que pecorre a lista de items e seta a imagem nele.
      for (var i=start; i<=end; i++) {
        let item = this.items[i];
        this.produtoService.getSmallImageFromBucket(item.id)
          .subscribe(response => {
            item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;//remonta a url da imagem
          },
          error => {});
      }
    }  

    showDetail(produto_id : string) {
      this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id});
    }

    presentLoading() {
      let loader = this.loadingCtrl.create({
        content: "Aguarde..."
      });
      loader.present();
      return loader;
    }

    doRefresh(refresher) {
      //depois de 1 segundo ele executa a função.
      this.page = 0;
      this.items = [];
      this.loadData();
      setTimeout(() => {
        refresher.complete();
      }, 1000);
    }

    doInfinite(infiniteScroll) {
      this.page++;
      this.loadData();
      setTimeout(() => {
        infiniteScroll.complete();
      }, 1000);
    }
}
