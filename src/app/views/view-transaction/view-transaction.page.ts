import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Transaction } from '../../dtos/transaction/transaction';
import { Account } from '../../dtos/account/account';

@Component({
    selector: 'app-view-transaction',
    templateUrl: './view-transaction.page.html',
    styleUrls: ['./view-transaction.page.scss']
})
export class ViewTransactionPage implements OnInit {
    private transaction: Transaction;
    private accName: string;

    constructor(public navParams: NavParams, public modalCtrl: ModalController) {}

    ngOnInit() {
        this.transaction = this.navParams.get('transaction');
        this.accName = this.navParams.get('accName');
    }

    closeModal() {
        this.modalCtrl.dismiss().then(r => r);
    }
}
