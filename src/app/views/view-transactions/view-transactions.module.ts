import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewTransactionsComponent } from './view-transactions.component';

const routes: Routes = [
    {
        path: '',
        component: ViewTransactionsComponent
    }
];

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
    declarations: [ViewTransactionsComponent]
})
export class ViewTransactionsComponentModule {}
