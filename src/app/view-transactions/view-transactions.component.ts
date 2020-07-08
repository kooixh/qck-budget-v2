import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ViewTransactionPage } from '../view-transaction/view-transaction.page';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.scss'],
})
export class ViewTransactionsComponent implements OnInit {

  private acc: any;
  private sortBy:string;

  constructor(public navParams: NavParams, public modalCtrl:ModalController, private storage: Storage) {
      this.storage.get('sortBy').then(data=>{
          if(data){
              this.sortBy = data;
          }else{
              this.acc = 'newest';
          }
      });
  }

  ngOnInit() {
      this.acc = this.navParams.get('acc');
  }

  //store the sortBy preference in settings
  selectChange(){
      this.storage.set('sortBy',this.sortBy);
  }

  delItem(index:number){
      this.acc.removeTransaction(index);
  }

  closeModal(){
      this.modalCtrl.dismiss(this.acc);
  }


  async viewSingle(index:number){
      const modal = await this.modalCtrl.create({
          component: ViewTransactionPage,
          componentProps:{
              transaction: this.acc.getTransactions()[index],
              accName:this.acc.getName()
          }
      });
      await modal.present();
  }



}
