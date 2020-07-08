import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionType } from '../../dtos/transaction/transaction';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DateFormater } from '../../utils/date-formatter/date-formater';

import { BarcodeApiService } from '../../services/barcode/barcode-api.service';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { LoadingController } from '@ionic/angular';

@Component({
    selector: 'app-add-transaction',
    templateUrl: './add-transaction.page.html',
    styleUrls: ['./add-transaction.page.scss']
})
export class AddTransactionPage implements OnInit {
    transaction: Transaction;
    amountVal: string;
    nameVal = '';
    typeVal: TransactionType = TransactionType.Expenses;

    warning = false;
    amountWarning = false;

    constructor(
        public toastController: ToastController,
        private storage: Storage,
        public modalCtrl: ModalController,
        private route: ActivatedRoute,
        private router: Router,
        private bar: BarcodeApiService,
        private barcodeScanner: BarcodeScanner,
        public alertController: AlertController,
        public loadingController: LoadingController
    ) {}

    // this is run when the page is shown
    ngOnInit() {}

    // this dismiss modal return null
    closeModal() {
        this.modalCtrl.dismiss();
    }

    // this dismiss modal return a new transaction
    async add() {
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

        // find the data and set to 000 for consistency
        const today = DateFormater.generateToday();

        const newTransaction = new Transaction(parseFloat(this.amountVal), this.nameVal, this.typeVal, today);
        await this.modalCtrl.dismiss(newTransaction);
    }

    // this is triggered when the income/expense segment change
    segmentChanged(ev: any) {
        if (ev.detail.value === 'income') {
            this.typeVal = TransactionType.Income;
        } else {
            this.typeVal = TransactionType.Expenses;
        }
    }

    // present an alert for barcode scanning, could be no item or error reading
    async presentBarcodeErrorAlert(title: string, msg: string) {
        const alert = await this.alertController.create({
            header: title,
            message: msg,
            buttons: ['OK']
        });

        await alert.present();
    }

    // open, scan and add product into the text fields
    async openBarcodeScanner() {
        const loading = await this.loadingController.create({
            spinner: 'crescent',
            message: 'Please wait...'
        });
        await loading.present();

        let loaded = false; // flag to indicate if camera loaded

        this.barcodeScanner
            .scan()
            .then((barcodeData) => {
                loaded = true;

                loading.dismiss();

                console.log('Barcode data', barcodeData);
                // fetch product from API
                this.bar.fetchProduct(barcodeData.text).subscribe(
                    async (res) => {
                        console.log(res);
                        const obj = JSON.parse(res.data);

                        if (obj.total !== 0) {
                            // retrieve the first item in the array.
                            const indvObj = obj.items[0];

                            this.nameVal = indvObj.title;
                            this.amountVal = indvObj.lowest_recorded_price;
                        } else {
                            await this.presentBarcodeErrorAlert(
                                'Item not found',
                                'The barcode does not match any item on record, try inputing manually instead.'
                            );
                        }
                    },
                    async (error) => {
                        await this.presentBarcodeErrorAlert(
                            'Barcode Lookup Error',
                            'There was an issue looking up the barcode, try inputing manually instead.'
                        );
                    }
                );
            })
            .catch(async (err) => {
                if (!loaded) {
                    await loading.dismiss();
                }
                // error for barcode scan error, non api error
                await this.presentBarcodeErrorAlert(
                    'Barcode Reading Error',
                    'There was an issue reading the barcode, try inputing manually instead.'
                );
            });
    }
}
