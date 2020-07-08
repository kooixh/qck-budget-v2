import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Account } from '../../dtos/account/account';
import { ModalController } from '@ionic/angular';
import { AddTransactionPage } from '../add-transaction/add-transaction.page';
import { Storage } from '@ionic/storage';
import { AddAccountComponent } from '../add-account/add-account.component';
import { ViewTransactionsComponent } from '../view-transactions/view-transactions.component';
import { ViewAccountsPage } from '../view-accounts/view-accounts.page';
import { AlertModalPage } from '../../modals/alert-modal/alert-modal.page';
import { DateFormater } from '../../utils/date-formatter/date-formater';
import { AboutModalPage } from '../../modals/about-modal/about-modal.page';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class HomePage {
    private acc: Account;
    private accounts: Account[];
    private active: number;

    private apiTest = 'nil';

    private modalPop = false; // flag to indicate if a modal is open, disable background buttons

    constructor(
        private storage: Storage,
        public modalController: ModalController
    ) {
        // find the active account if available
        this.storage.get('activeAccount').then((data) => {
            if (data) {
                this.acc = Account.generateAccountFromData(data);
            } else {
                this.acc = undefined;
            }
        });

        this.storage.get('sortBy').then(async (data) => {
            if (!data) {
                await this.storage.set('sortBy', 'newest');
            }
        });

        this.storage.get('activeAccountIndex').then((data) => {
            console.log(data);
            if (data !== null || data !== undefined) {
                this.active = Number(data);
            } else {
                this.active = -1;
            }
            console.log(this.active);
        });

        this.storage.get('accountList').then((data) => {
            if (data) {
                this.accounts = [];
                for (let i = 0; i < data.length; i++) {
                    this.accounts.push(Account.generateAccountFromData(data[i]));
                }
            } else {
                this.accounts = [];
            }
        });
    }

    async presentModalAlert() {
        const modal = await this.modalController.create({
            component: AlertModalPage,
            componentProps: {
                secText: 'Upgrade to premium to add more than 10 transactions!'
            },
            cssClass: 'alertModal'
        });

        await modal.present();
        this.modalPop = true;
        await modal.onDidDismiss();
        this.modalPop = false;
    }

    // this function navigates to the add page
    async navigateToAdd() {
        if (this.modalPop) {
            return;
        }

        const date = DateFormater.generateToday();

        // free version's limit
        if (this.acc.getTransactionsByDate(date) >= 10) {
            await this.presentModalAlert();
            return;
        }

        const modal = await this.modalController.create({
            component: AddTransactionPage
        });
        await modal.present();

        const transactionModalResponse = await modal.onDidDismiss();

        if (transactionModalResponse.data !== undefined) {
            this.acc.addTransaction(transactionModalResponse.data);
            this.accounts[this.active] = this.acc;

            await this.storage.set('activeAccount', this.acc);
            await this.storage.set('accountList', this.accounts);
        }
    }

    async showViewAccounts() {
        if (this.modalPop) {
            return;
        }

        const modal = await this.modalController.create({
            component: ViewAccountsPage,
            componentProps: {
                accs: this.accounts,
                active: this.active
            }
        });
        await modal.present();

        const returnObj = await modal.onDidDismiss();

        this.accounts = returnObj.data.accounts;

        // if all account deleted
        if (returnObj.data.active === -1) {
            this.acc = undefined;
            await this.storage.remove('activeAccount');
            await this.storage.remove('activeAccountIndex');
            await this.storage.remove('accountList');
        } else {
            // change the active account
            this.active = returnObj.data.active;

            this.acc = this.accounts[returnObj.data.active];
            await this.storage.set('activeAccount', this.acc);
            await this.storage.set('activeAccountIndex', this.active);
            await this.storage.set('accountList', this.accounts);
        }
    }

    // this is called when there is no account currently
    async showAddAccount() {
        const modal = await this.modalController.create({
            component: AddAccountComponent
        });
        await modal.present();

        const accountModalResponse = await modal.onDidDismiss();
        if (accountModalResponse.data !== undefined) {
            // adding the first accountModalResponse set the index to 0
            if (this.acc === undefined) {
                this.acc = accountModalResponse.data;
                await this.storage.set('activeAccount', this.acc);
                this.accounts.push(this.acc);
                this.active = 0;
                await this.storage.set('activeAccountIndex', this.active.toString());
                await this.storage.set('accountList', this.accounts);
            }
        }
    }

    async showAbout() {
        const modal = await this.modalController.create({
            component: AboutModalPage,
            cssClass: 'aboutModal'
        });

        await modal.present();
        this.modalPop = true;

        await modal.onDidDismiss();
        this.modalPop = false;
    }

    // navigate to the page to view all transactions
    async showViewTransactions() {
        if (this.modalPop) {
            return;
        }

        const modal = await this.modalController.create({
            component: ViewTransactionsComponent,
            componentProps: {
                acc: this.acc
            }
        });
        await modal.present();
        const retAcc = await modal.onDidDismiss();

        this.acc = retAcc.data;
        await this.storage.set('activeAccount', this.acc);

        this.accounts[this.active] = this.acc;
        await this.storage.set('accountList', this.accounts);
    }
}
