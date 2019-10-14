import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { API_CONFIG } from '../../config/api.config';
import { CameraOptions, Camera } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente : ClienteDTO;
  picture: string;
  cameraOn: boolean = false;//ativar e desativar botão para tirar foto

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams , 
     public storage: StorageService , 
     public clienteService :ClienteService,
     public camera: Camera) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData()  {
    let localUser = this.storage.getLocalUser();
  
    if(localUser && localUser.email){
      console.log("localUser.email inicio ");
      
      this.clienteService.findByEmail(localUser.email)
      
      .subscribe(response =>{
        //as ClienteDTO -cache para ClienteDTO
        this.cliente = response as ClienteDTO;
        console.log("oi estou no response");
        this.getImageIfExists();
      },
      error =>{
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      });
    }else{
      console.log("Estou no else ... ");
      this.navCtrl.setRoot('HomePage');
    }

  }

  getImageIfExists() {
    console.log(this.cliente.id)
   
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      console.log( this.cliente.imageUrl)
    },
    error => {});
  }

  getCameraPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }

  sendPicture() {
    this.clienteService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null;//já carreguei e depois colo null
        this.loadData();//força o recarregamento dos dados
      },
      error => {
      });
  }

  cancel() {
    this.picture = null;//descarta imagem
  }

  getGalleryPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }



}
