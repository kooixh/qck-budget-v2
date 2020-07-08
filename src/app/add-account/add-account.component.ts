import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { Account } from '../account'


@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss'],
})

export class AddAccountComponent implements OnInit {

  nameVal:string ="";
  balVal: string;

  //for invalid values
  warning = false;
  amountWarning = false;

  constructor(public toastController: ToastController, public modalCtrl: ModalController,private route: ActivatedRoute , private router: Router,public navCtrl: NavController) {}

  ngOnInit() {}


  public closeModal(){
      this.modalCtrl.dismiss();
  }


  async addAccount(){


      //validation
      if(this.nameVal.trim().length === 0){

          this.warning = true;
          setTimeout(()=>{this.warning = false;},2000);


          const toast = await this.toastController.create({
              message: 'This field is required',
              duration: 2000,
              color: 'danger'
          });
          toast.present();
          return;
      }



      let a = new Account(this.nameVal,parseFloat(this.balVal));
      this.modalCtrl.dismiss(a);
  }

}
