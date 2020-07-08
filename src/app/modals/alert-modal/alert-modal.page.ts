import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
    selector: 'app-alert-modal',
    templateUrl: './alert-modal.page.html',
    styleUrls: ['./alert-modal.page.scss']
})
export class AlertModalPage implements OnInit {
    private secText: string;

    constructor(public navParams: NavParams, public modalCtrl: ModalController) {}

    ngOnInit() {
        this.secText = this.navParams.get('secText');
    }

    closeModal() {
        this.modalCtrl.dismiss().then(r => r);
    }
}
