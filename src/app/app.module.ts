import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AddTransactionPageModule } from './views/add-transaction/add-transaction.module';
import { AddAccountComponentModule } from './views/add-account/add-account.module';
import { ViewTransactionsComponentModule } from './views/view-transactions/view-transactions.module';
import { ViewAccountsPageModule } from './views/view-accounts/view-accounts.module';
import { ViewTransactionPageModule } from './views/view-transaction/view-transaction.module';
import { AlertModalPageModule } from './modals/alert-modal/alert-modal.module';
import { AboutModalPageModule } from './modals/about-modal/about-modal.module';

import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { AppVersion } from '@ionic-native/app-version/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        AddTransactionPageModule,
        AddAccountComponentModule,
        ViewTransactionsComponentModule,
        ViewAccountsPageModule,
        ViewTransactionPageModule,
        AlertModalPageModule,
        AboutModalPageModule,
        HttpClientModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        BarcodeScanner,
        AppVersion,
        HTTP,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
