import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { AddAccountComponent } from '../add-account/add-account.component';
import { AlertModalPage } from '../../modals/alert-modal/alert-modal.page';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-view-accounts',
    templateUrl: './view-accounts.page.html',
    styleUrls: ['./view-accounts.page.scss']
})
export class ViewAccountsPage implements OnInit {
    private accounts: Account[];
    private active: number;

    private modalOpened = false;

    constructor(
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public actionSheetController: ActionSheetController,
        public alertController: AlertController,
        private storage: Storage
    ) {}

    ngOnInit() {
        this.accounts = this.navParams.get('accs');
        this.active = this.navParams.get('active');
    }

    closeModal() {
        if (this.modalOpened) {
            return;
        }

        const returnObj = { accounts: this.accounts, active: this.active };
        this.modalCtrl.dismiss(returnObj).then(r => r);
    }

    async showAddAccount() {
        if (this.modalOpened) {
            return;
        }

        if (this.accounts.length === 3) {
            await this.presentModalAlert();
        } else {
            const modal = await this.modalCtrl.create({
                component: AddAccountComponent
            });
            await modal.present();

            const account = await modal.onDidDismiss();
            if (account.data !== undefined) {
                this.accounts.push(account.data);
                await this.storage.set('accountList', this.accounts);
            }
        }
    }

    async presentModalAlert() {
        const modal = await this.modalCtrl.create({
            component: AlertModalPage,
            componentProps: {
                secText: 'Upgrade to premium to add more than 3 accounts!'
            },
            cssClass: 'alertModal'
        });

        await modal.present();
        this.modalOpened = true;

        await modal.onDidDismiss();
        this.modalOpened = false;
    }

    async presentAlertConfirm(index: number) {
        if (this.modalOpened) {
            return;
        }

        const alert = await this.alertController.create({
            header: 'Confirm Delete?',
            message: 'Are you sure you want to delete this account? This action is not reversible.',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel:');
                    }
                },
                {
                    text: 'Delete',
                    role: 'destructive',
                    handler: () => {
                        console.log('Confirm Okay');
                        this.accounts.splice(index, 1);
                        // if active is deleted
                        if (this.active === index) {
                            // set as the first acc
                            this.active = this.accounts.length !== 0 ? 0 : -1;
                        } else if (index < this.active) {
                            this.active--;
                        }
                        if (this.active === -1) {
                            // this.acc = undefined;
                            this.storage.remove('activeAccount');
                            this.storage.remove('activeAccountIndex');
                            this.storage.remove('accountList');
                        } else {
                            const acc = this.accounts[this.active];
                            this.storage.set('activeAccount', acc);
                            this.storage.set('activeAccountIndex', this.active);
                            this.storage.set('accountList', this.accounts);
                        }
                    }
                }
            ]
        });

        await alert.present();
    }

    async presentActionSheet(index: number) {
        if (this.modalOpened) {
            return;
        }

        const actionSheet = await this.actionSheetController.create({
            header: 'Action',
            cssClass: 'ion-margin-bottom ion-padding-right',
            buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: 'trash',
                    handler: async () => {
                        console.log('Delete clicked');
                        await this.presentAlertConfirm(index);
                    }
                },
                {
                    text: 'Set Active',
                    icon: 'done-all',
                    handler: () => {
                        console.log('Active clicked');
                        this.active = index;

                        const acc = this.accounts[this.active];
                        this.storage.set('activeAccount', acc);
                        this.storage.set('activeAccountIndex', this.active);
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        await actionSheet.present();
    }
}
