import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Account } from '../../dtos/account/account';

@Component({
    selector: 'app-add-account',
    templateUrl: './add-account.component.html',
    styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {
    nameVal = '';
    balVal: string;

    // for invalid values
    warning = false;
    amountWarning = false;

    constructor(
        public toastController: ToastController,
        public modalCtrl: ModalController
    ) {}

    ngOnInit() {}

    public closeModal() {
        this.modalCtrl.dismiss().then(r => r);
    }

    async addAccount() {
        // validation
        if (this.nameVal.trim().length === 0) {
            this.warning = true;
            setTimeout(() => {
                this.warning = false;
            }, 2000);

            const toast = await this.toastController.create({
                message: 'This field is required',
                duration: 2000,
                color: 'danger'
            });
            await toast.present();
            return;
        }

        const account = new Account(this.nameVal, parseFloat(this.balVal));
        await this.modalCtrl.dismiss(account);
    }
}
