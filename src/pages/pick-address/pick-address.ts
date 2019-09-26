import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {

    let localUser = this.storage.getLocalUser();//Ver se usuario está logado
    if (localUser && localUser.email) {//valido o email
      this.clienteService.findByEmail(localUser.email)//busco no REST por email.
        .subscribe(response => {
          this.items = response['enderecos']; // campo enderecos -  vem da resposta REST.(['enderecos'] colo entre cochetes para o copilador não reclamar.)
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
          });
        }
        else {
          this.navCtrl.setRoot('HomePage');
        }
  
  }

}
