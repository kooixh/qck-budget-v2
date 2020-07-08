import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-about-modal',
  templateUrl: './about-modal.page.html',
  styleUrls: ['./about-modal.page.scss'],
})
export class AboutModalPage implements OnInit {

  appName: any;
  appVersionNo: any;
  constructor(public modalCtrl:ModalController, private appVersion: AppVersion) {
    this.appVersion.getAppName().then((val)=>{this.appName = val;});
    this.appVersion.getVersionNumber().then((val) => {this.appVersionNo = val;});

  }

  ngOnInit() {
  }

  closeModal(){
      this.modalCtrl.dismiss();
  }

}
