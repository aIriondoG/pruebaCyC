import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  image: string = null;
  currentImage : any;
  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    private emailComposer: EmailComposer
  ) {

  }
  //Saca foto 
  getPicture() {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }
    this.camera.getPicture(options)
      .then(imageData => {
        this.currentImage = imageData;
      })
      .catch(error => {
        console.error(error);
      })
    console.log("Direction: "+this.camera.Direction);
  }
  //Manda email
  sendEmail() {
    let email = {
      to: 'airiondo@cic.es',
      //cc: 'max@mustermann.de',
      attachments: [
        this.currentImage,
      ],
      subject: 'Foto con la camara',
      body: 'Esta es la foto que acabo de hacer con mi dispositivo android',
      isHtml: true
    };
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        console.log("Tiramos");
        this.emailComposer.open(email);
      }else{
        console.log("No disponible pero tiramos");
        this.emailComposer.open(email);
      }
    });
    
  }

}
