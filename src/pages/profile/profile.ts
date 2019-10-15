import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { API_CONFIG } from '../../config/api.config';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente : ClienteDTO;
  picture: string;
  profileImage;
  cameraOn: boolean = false;//ativar e desativar botão para tirar foto

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams , 
     public storage: StorageService , 
     public clienteService :ClienteService,
     public camera: Camera,
     public sanitizer: DomSanitizer) {
       //DomSanitizer autoriza setar a imgem na variavel profileImage.

       this.profileImage = 'assets/imgs/avatar-blank.png';
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
       
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      this.blobToDataURL(response).then(dataUrl => {
        let str : string = dataUrl as string;
        this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
      });
    },
    error => {
      this.profileImage = 'assets/imgs/avatar-blank.png';
    });
  }
//CONVERTE GLOB PARA BASE 64
  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => fulfill(reader.result);
        reader.readAsDataURL(blob);
    })
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
        this.getImageIfExists();
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
