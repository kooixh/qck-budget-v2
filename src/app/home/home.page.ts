import { Component,ChangeDetectionStrategy } from '@angular/core';
import { Transaction,TransactionType } from '../transaction'
import { Account } from '../account'
import { ModalController, AlertController } from '@ionic/angular';
import { AddTransactionPage } from '../add-transaction/add-transaction.page';
import { Router, RouterModule, Routes} from '@angular/router';
import { Storage } from '@ionic/storage';
import { AddAccountComponent } from '../add-account/add-account.component';
import { ViewTransactionsComponent } from '../view-transactions/view-transactions.component';
import { ViewAccountsPage } from '../view-accounts/view-accounts.page';
import { AlertModalPage } from '../alert-modal/alert-modal.page';
import { DateFormater } from '../date-formater';
import { AboutModalPage } from '../about-modal/about-modal.page';

import { Platform } from '@ionic/angular';

import { BarcodeApiService } from '../barcode-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomePage{

    private acc: Account;
    private accounts:Account[];
    private active:number;

    private apiTest:string = 'nil';


    private modalPop = false; // flag to indicate if a modal is open, disable background buttons

    constructor( private storage: Storage , private router: Router,public modalController: ModalController, public alertController: AlertController) {

        //find the active account if available
        this.storage.get('activeAccount').then(data=>{
            if(data){
                this.acc = Account.generateAccountFromData(data);
            }else{
                this.acc = undefined;
            }
        });

        this.storage.get('sortBy').then(data=>{
            if(data){
            }else{
                this.storage.set('sortBy','newest');
            }
        });


        this.storage.get('activeAccountIndex').then(data =>{
            console.log(data);
            if(data !== null || data !== undefined){
                this.active = Number(data);
            }else{
                this.active = -1;
            }
            console.log(this.active);
        });


        this.storage.get('accountList').then(data=>{
            if(data){
                this.accounts = [];
                for(let i = 0;i<data.length;i++){
                    this.accounts.push(Account.generateAccountFromData(data[i]));
                }

            }else{

                //TEST CODE
                this.accounts = [];
            }
        });

    }



    async presentModalAlert(){
        let modal =  await this.modalController.create({
              component: AlertModalPage,
              componentProps:{
                  secText: 'Upgrade to premium to add more than 10 transactions!'
              },
              cssClass: 'alertModal'
        });

        await modal.present();
        this.modalPop = true;
        await modal.onDidDismiss();
        this.modalPop = false;
    }


    //this function navigates to the add page
    async navigateToAdd(){


        if(this.modalPop)
            return;

        let date = DateFormater.generateToday();

        //free version's limit
        if(this.acc.getTransactionsByDate(date) >= 10){
            await this.presentModalAlert();
            return;
        }



        const modal = await this.modalController.create({
            component: AddTransactionPage,
        });
        await modal.present();


        let t = await modal.onDidDismiss();


        if(t.data !== undefined){
            this.acc.addTransaction(t.data);
            this.accounts[this.active] = this.acc;

            this.storage.set('activeAccount',this.acc);
            this.storage.set('accountList',this.accounts);
        }
    }


    async showViewAccounts(){

        if(this.modalPop)
            return;

        const modal = await this.modalController.create({
            component: ViewAccountsPage,
            componentProps: {
                accs:this.accounts,
                active:this.active
            }
        });
        await modal.present();

        let returnObj = await modal.onDidDismiss();

        this.accounts = returnObj.data.accounts;

        //if all account deleted
        if(returnObj.data.active === -1){
            this.acc = undefined;
            this.storage.remove('activeAccount');
            this.storage.remove('activeAccountIndex');
            this.storage.remove('accountList');

        }else{
            //change the active account
            this.active = returnObj.data.active;

            this.acc = this.accounts[returnObj.data.active];
            this.storage.set('activeAccount',this.acc);
            this.storage.set('activeAccountIndex',this.active);
            this.storage.set('accountList',this.accounts);
        }

    }

    //this is called when there is no account currently
    async showAddAccount(){
        const modal = await this.modalController.create({
            component: AddAccountComponent,
        });
        await modal.present();

        let account = await modal.onDidDismiss();
        if(account.data !== undefined){
            //adding the first account set the index to 0
            if(this.acc === undefined){
                this.acc = account.data;
                this.storage.set('activeAccount',this.acc);
                this.accounts.push(this.acc);
                this.active = 0;
                this.storage.set('activeAccountIndex',this.active.toString());
                this.storage.set('accountList',this.accounts);
            }
        }
    }



  async showAbout(){


      const modal = await this.modalController.create({
         component: AboutModalPage,
         cssClass: 'aboutModal'
      });

      await modal.present();
      this.modalPop = true;

      await modal.onDidDismiss();
      this.modalPop = false;
  }

    //navigate to the page to view all transactions
    async showViewTransactions(){

        if(this.modalPop)
            return;

        const modal = await this.modalController.create({
            component: ViewTransactionsComponent,
            componentProps:{
                acc: this.acc
            }
        });
        await modal.present();
        let retAcc = await modal.onDidDismiss();

        this.acc = retAcc.data;
        this.storage.set('activeAccount',this.acc);

        this.accounts[this.active] = this.acc;
        this.storage.set('accountList',this.accounts);
    }



}
